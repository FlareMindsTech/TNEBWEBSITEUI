import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getMinthiranById } from "../api";
import FlipBookModal from "../components/FlipBookModal";

const MinthiranBookDetail = () => {
  const { bookId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [book, setBook] = useState(state?.book || null);
  const [loading, setLoading] = useState(!state?.book);

  useEffect(() => {
    if (state?.book) return;
    const fetchBook = async () => {
      try {
        setLoading(true);
        const data = await getMinthiranById(bookId);
        if (data) {
          const formatted = {
            id: data._id || bookId,
            title: data.title || `e-Minthiran — ${data.month} ${data.year}`,
            category: "e-Minthiran",
            month: data.month,
            year: data.year,
            docUrl: data.pdf?.url || data.docUrl || data.url || null,
            pages: Array.isArray(data.pdf?.pages)
              ? data.pdf.pages
              : Array.isArray(data.pages)
              ? data.pages
              : [],
            pageCount:
              data.pdf?.pages?.length || data.pages?.length || 0,
            description: data.description || "",
          };
          setBook(formatted);
        }
      } catch (err) {
        console.error("Error fetching Minthiran book:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookId, state?.book]);

  const handleClose = () => {
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }
    navigate("/minthiran");
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#f8fafc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#0f172a",
        }}
      >
        <h4>Loading e-Minthiran Edition…</h4>
      </div>
    );
  }

  const bookData = book?.title
    ? book
    : {
        id: book?._id || bookId,
        title: book?.title || `e-Minthiran — ${book?.month} ${book?.year}`,
        category: "e-Minthiran",
        month: book?.month,
        year: book?.year,
        docUrl: book?.pdf?.url || book?.docUrl || book?.url || null,
        pages: Array.isArray(book?.pdf?.pages)
          ? book?.pdf.pages
          : Array.isArray(book?.pages)
          ? book?.pages
          : [],
        pageCount:
          book?.pdf?.pages?.length || book?.pages?.length || 0,
        description: book?.description || "",
      };

  return <FlipBookModal book={bookData} onClose={handleClose} />;
};

export default MinthiranBookDetail;
