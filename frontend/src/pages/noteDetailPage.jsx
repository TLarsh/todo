// import { LoaderIcon, Trash2Icon } from "lucide-react";
// import {useState} from "react"
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router";

// const NoteDetailPage = () => {
//   const [note, setNote] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);

//   const navigate = useNavigate();

//   const { id } = useParams();

//   console.log("Note ID:", id);

//   useEffect(() => {
//     const fetchNote = async () => {
//       try {
//         const response = await api.get(`/notes/${id}`);
//         setNote(response.data);
//       } catch (error) {
//         console.error("Error fetching note:", error);
//         toast.error("Failed to fetch note");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNote();
//   }, [id]);

//   console.log({note});

//   if (true) {
//     return (
//       <div className="min-h-screen bg-base-200 flex items-center justify-center">
//         <LoaderIcon className="animate-spin size-10" />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-base-200 flex items-center justify-center">
//       <div className="container mx-auto px-4 py-8">
//         <div className="max-w-2xl mx-auto">

//         <div className="flex items-center justify-between mb-6">
//           <Link to="/" className="btn btn-ghost">
//             <ArrowLeftIcon className="h-5 w-5" />
//             Back to Notes
//           </Link>
//           <button onClick={handleDelete} className="btn btn-error btn-outline">
//             <Trash2Icon className="h-5 w-5" />
//             Delete Note
//           </button>
//         </div>
//         </div>
//       </div>
//     </div>
//   )

// }

// export default NoteDetailPage;



// ...existing code...
import { LoaderIcon, Trash2Icon, ArrowLeftIcon } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams, Link } from "react-router";
import api from "../lib/axios"; // adjust path if different
// ...existing code...

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.error("Error fetching note:", error);
        toast.error("Failed to fetch note");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!confirm("Delete this note?")) return;
    setSaving(true);
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete note");
    } finally {
      setSaving(false);
    }
  };
  

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin" size={30} />
      </div>
    );
  }

  // if (!note) {
  //   return (
  //     <div className="min-h-screen bg-base-200 flex items-center justify-center">
  //       <p>No note found.</p>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-base-200 ">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Notes
            </Link>
            <button onClick={handleDelete} className="btn btn-error btn-outline" disabled={saving}>
              <Trash2Icon className="h-5 w-5" />
              {saving ? "Deleting..." : "Delete Note"}
            </button>
          </div>
          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input 
                  type="text" 
                  className="input input-bordered" 
                  placeholder="Enter note title"
                  value={note.title} 
                  onChange={(e) => setNote({...note, title: e.target.value})}
                />
              </div>

             

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  className="textarea textarea-bordered h-32"
                  placeholder="Enter note content"
                  value={note.content}
                  onChange={(e) => setNote({...note, content: e.target.value})}
                />
              </div>
              <div className="card-actions justify-end">
                <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;

