import React from "react";
import { Notebook as NotebookIcon } from "lucid-react";
import PropTypes from "prop-types";

// /Users/macbookair/Desktop/Javascript Projects/todo/frontend/src/components/NotesNotFound.jsx

/**
 * NotesNotFound
 * Simple "no notes" placeholder page. Shows a notebook icon, message and an action button.
 *
 * Props:
 * - onCreate: optional callback when user clicks "Create Note"
 * - title: optional title text
 * - description: optional description text
 */
const NotesNotFound = ({
    onCreate,
    title = "No notes yet",
    description = "There are no notes in the database. Create your first note to get started.",
}) => {
    const handleCreate = (e) => {
        if (onCreate) {
            onCreate(e);
            return;
        }
        // fallback: navigate to a common create route
        window.location.href = "/notes/new";
    };

    return (
        <div style={styles.container} role="status" aria-live="polite">
            <div style={styles.card}>
                <NotebookIcon size={72} style={styles.icon} />
                <h2 style={styles.title}>{title}</h2>
                <p style={styles.description}>{description}</p>
                <button type="button" onClick={handleCreate} style={styles.button}>
                    Create note
                </button>
            </div>
        </div>
    );
};

NotesNotFound.propTypes = {
    onCreate: PropTypes.func,
    title: PropTypes.string,
    description: PropTypes.string,
};

export default NotesNotFound;

const styles = {
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 16px",
        width: "100%",
        height: "100%",
    },
    card: {
        textAlign: "center",
        maxWidth: 520,
        padding: 32,
        borderRadius: 8,
        background: "rgba(0,0,0,0.03)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
    },
    icon: {
        color: "#6b7280", // gray-500
        marginBottom: 12,
    },
    title: {
        margin: "8px 0",
        fontSize: 20,
        color: "#111827",
    },
    description: {
        margin: "8px 0 20px",
        color: "#374151",
    },
    button: {
        background: "#2563eb", // blue-600
        color: "#fff",
        border: "none",
        padding: "10px 16px",
        borderRadius: 6,
        cursor: "pointer",
        fontSize: 14,
    },
};