import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getMinthiranById } from '../api';
import './MinthiranBookDetail.css';

const MIN_ZOOM = 0.8;
const MAX_ZOOM = 2.4;
const ZOOM_STEP = 0.2;

const MinthiranBookDetail = () => {
	const { bookId } = useParams();
	const { state } = useLocation();
	const navigate = useNavigate();

	const [book, setBook] = useState(state?.book || null);
	const [loading, setLoading] = useState(!state?.book);
	const [error, setError] = useState('');
	const [currentPage, setCurrentPage] = useState(0);
	const [direction, setDirection] = useState(1);
	const [leavingImage, setLeavingImage] = useState(null);
	const [zoom, setZoom] = useState(1);
	const [pan, setPan] = useState({ x: 0, y: 0 });
	const [isDragging, setIsDragging] = useState(false);
	const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
	const viewportRef = useRef(null);
	const pageStackRef = useRef(null);

	const pageImages = useMemo(() => book?.pdf?.pages || [], [book]);
	const pageCount = pageImages.length;
	const currentImage = pageImages[currentPage];

	const clampPan = useCallback((nextX, nextY, nextZoom = zoom) => {
		const viewport = viewportRef.current;
		const pageStack = pageStackRef.current;

		if (!viewport || !pageStack || nextZoom <= 1) {
			return { x: 0, y: 0 };
		}

		const scaledWidth = pageStack.offsetWidth * nextZoom;
		const scaledHeight = pageStack.offsetHeight * nextZoom;
		const maxX = Math.max(0, (scaledWidth - viewport.clientWidth) / 2);
		const maxY = Math.max(0, (scaledHeight - viewport.clientHeight) / 2);

		return {
			x: Math.min(maxX, Math.max(-maxX, nextX)),
			y: Math.min(maxY, Math.max(-maxY, nextY))
		};
	}, [zoom]);

	const fetchBook = useCallback(async () => {
		if (!bookId || state?.book) return;

		try {
			setLoading(true);
			setError('');
			const data = await getMinthiranById(bookId);
			setBook(data);
		} catch (err) {
			console.error('Error fetching Minthiran book:', err);
			setError('Unable to load this book right now. Please try again later.');
		} finally {
			setLoading(false);
		}
	}, [bookId, state?.book]);

	useEffect(() => {
		fetchBook();
	}, [fetchBook]);

	const turnToPage = useCallback((nextPage) => {
		if (nextPage < 0 || nextPage >= pageCount || nextPage === currentPage) return;
		setDirection(nextPage > currentPage ? 1 : -1);
		setLeavingImage(currentImage);
		setCurrentPage(nextPage);
		setPan({ x: 0, y: 0 });
	}, [currentPage, currentImage, pageCount]);

	const zoomIn = useCallback(() => {
		setZoom((prevZoom) => {
			const nextZoom = Math.min(MAX_ZOOM, +(prevZoom + ZOOM_STEP).toFixed(2));
			setPan((prevPan) => clampPan(prevPan.x, prevPan.y, nextZoom));
			return nextZoom;
		});
	}, [clampPan]);

	const zoomOut = useCallback(() => {
		setZoom((prevZoom) => {
			const nextZoom = Math.max(MIN_ZOOM, +(prevZoom - ZOOM_STEP).toFixed(2));
			setPan((prevPan) => clampPan(prevPan.x, prevPan.y, nextZoom));
			return nextZoom;
		});
	}, [clampPan]);

	const resetZoom = useCallback(() => {
		setZoom(1);
		setPan({ x: 0, y: 0 });
	}, []);

	const handleKeyPress = useCallback(
		(event) => {
			if (event.key === 'ArrowRight') {
				turnToPage(currentPage + 1);
			}
			if (event.key === 'ArrowLeft') {
				turnToPage(currentPage - 1);
			}
			if (event.key === '+' || event.key === '=') {
				zoomIn();
			}
			if (event.key === '-') {
				zoomOut();
			}
		},
		[currentPage, turnToPage, zoomIn, zoomOut]
	);

	useEffect(() => {
		window.addEventListener('keydown', handleKeyPress);
		return () => window.removeEventListener('keydown', handleKeyPress);
	}, [handleKeyPress]);

	useEffect(() => {
		setLeavingImage(null);
	}, [currentImage]);

	const handleMouseDown = (event) => {
		if (zoom <= 1) return;
		event.preventDefault();
		setIsDragging(true);
		setDragStart({
			x: event.clientX - pan.x,
			y: event.clientY - pan.y
		});
	};

	const handleMouseMove = (event) => {
		if (!isDragging || zoom <= 1) return;
		const nextX = event.clientX - dragStart.x;
		const nextY = event.clientY - dragStart.y;
		setPan(clampPan(nextX, nextY));
	};

	const stopDragging = () => {
		setIsDragging(false);
	};

	if (loading) {
		return (
			<div className="minthiran-reader-wrapper">
				<div className="reader-loading">Loading book...</div>
			</div>
		);
	}

	if (error || !book) {
		return (
			<div className="minthiran-reader-wrapper">
				<div className="reader-error-card">
					<h2>Book Not Available</h2>
					<p>{error || 'This book could not be found.'}</p>
					<button className="reader-btn" onClick={() => navigate('/Minthiran')}>
						Back to Minthiran
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="minthiran-reader-wrapper">
			<div className="reader-header-bar">
				<button className="reader-btn ghost" onClick={() => navigate('/Minthiran')}>
					← Back
				</button>
				<div className="reader-title-block">
					<h1>e-Minthiran</h1>
					<p>{book.month} {book.year}</p>
				</div>
			</div>

			{pageCount > 0 ? (
				<>
					<div className="reader-book-shell">
						<div className="book-depth-shadow" />
						<div
							ref={viewportRef}
							className={`book-page-area ${zoom > 1 ? 'can-pan' : ''} ${isDragging ? 'dragging' : ''}`}
							onMouseDown={handleMouseDown}
							onMouseMove={handleMouseMove}
							onMouseUp={stopDragging}
							onMouseLeave={stopDragging}
						>
							<div
								className="book-zoom-stage"
								style={{ transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})` }}
							>
								<div ref={pageStackRef} className="book-page-stack">
									<img
										src={currentImage}
										alt={`Page ${currentPage + 1}`}
										className="book-current-page base"
									/>

									<AnimatePresence initial={false}>
										{leavingImage && (
											<motion.div
												key={`${book._id}-${currentPage}-${direction}`}
												className={`book-flip-sheet ${direction > 0 ? 'forward' : 'backward'}`}
												initial={{ rotateY: 0, opacity: 1 }}
												animate={{ rotateY: direction > 0 ? -174 : 174, opacity: 1 }}
												exit={{ opacity: 0 }}
												transition={{ duration: 0.72, ease: [0.18, 0.66, 0.3, 1] }}
												onAnimationComplete={() => setLeavingImage(null)}
											>
												<div className="sheet-face front">
													<img src={leavingImage} alt="Current turning page" className="book-current-page" />
												</div>
												<div className="sheet-face back">
													<img src={currentImage} alt={`Page ${currentPage + 1}`} className="book-current-page" />
												</div>
											</motion.div>
										)}
									</AnimatePresence>
								</div>
							</div>
						</div>
					</div>

					<div className="reader-controls">
						<div className="reader-zoom-controls">
							<button className="reader-btn" onClick={zoomOut} disabled={zoom <= MIN_ZOOM}>
								Zoom -
							</button>
							<button className="reader-btn" onClick={resetZoom} disabled={zoom === 1}>
								Reset
							</button>
							<button className="reader-btn" onClick={zoomIn} disabled={zoom >= MAX_ZOOM}>
								Zoom +
							</button>
							<div className="reader-page-count">{Math.round(zoom * 100)}%</div>
						</div>

						<button className="reader-btn" onClick={() => turnToPage(0)} disabled={currentPage === 0}>
							First
						</button>
						<button className="reader-btn" onClick={() => turnToPage(currentPage - 1)} disabled={currentPage === 0}>
							Prev
						</button>
						<div className="reader-page-count">
							Page {currentPage + 1} of {pageCount}
						</div>
						<button
							className="reader-btn"
							onClick={() => turnToPage(currentPage + 1)}
							disabled={currentPage === pageCount - 1}
						>
							Next
						</button>
						<button
							className="reader-btn"
							onClick={() => turnToPage(pageCount - 1)}
							disabled={currentPage === pageCount - 1}
						>
							Last
						</button>
					</div>
				</>
			) : (
				<div className="reader-fallback">
					<p>Page preview is not available. Reading directly from PDF.</p>
					<iframe title="Minthiran PDF Reader" src={book?.pdf?.url} className="pdf-frame" />
				</div>
			)}
		</div>
	);
};

export default MinthiranBookDetail;
