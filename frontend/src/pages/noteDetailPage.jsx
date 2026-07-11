
import { LoaderIcon, Trash2Icon, ArrowLeftIcon } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams, Link } from "react-router";
import api from "../lib/axios"; // adjust path if different


const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  // useEffect(() => {
  //   const fetchNote = async () => {
  //     try {
  //       const res = await api.get(`/notes/${id}`);
  //       setNote(res.data);
  //     } catch (error) {
  //       console.error("Error fetching note:", error);
  //       toast.error("Failed to fetch note");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (id) fetchNote();
  // }, [id]);

  useEffect(() => {
  const fetchNote = async () => {
    try {
      const { data } = await api.get(`/notes/${id}`);
      setNote(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load note");
    } finally {
      setLoading(false);
    }
  };

  if (id) {
    fetchNote();
  }
}, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Do you really want to elete this note?")) return;
    // setSaving(true);
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete note");
    } 
    // finally {
    //   setSaving(false);
    // }
  };

  const handleSave = async () => {
    if (!note.title || !note.content.trim()) {
      toast.error("Title and content are required");
      return;
    }
    setSaving(true);
    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated");
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  }
  

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
                <input 
                  type="text" 
                  className="textarea textarea-bordered h-32" 
                  placeholder="Type your note here..."
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



// import { LoaderIcon, Trash2Icon, ArrowLeftIcon } from "lucide-react";
// import { useState, useEffect } from "react";
// import toast from "react-hot-toast";
// import { useNavigate, useParams, Link } from "react-router";
// import api from "../lib/axios";

// const NoteDetailPage = () => {
//   const [note, setNote] = useState({
//     title: "",
//     content: "",
//   });

//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);

//   const navigate = useNavigate();
//   const { id } = useParams();

//   useEffect(() => {
//     const fetchNote = async () => {
//       try {
//         const res = await api.get(`/notes/${id}`);

//         console.log("Fetched note:", res.data);

//         // 👇 Check your API response in the console.
//         // If the response is { note: {...} }, change this to:
//         // setNote(res.data.note);

//         setNote(res.data); // <-- Check this
//       } catch (error) {
//         console.error("Error fetching note:", error);
//         toast.error("Failed to load note");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) {
//       fetchNote();
//     }
//   }, [id]);

//   const handleDelete = async () => {
//     if (!window.confirm("Do you really want to delete this note?")) return;

//     setSaving(true);

//     try {
//       await api.delete(`/notes/${id}`);
//       toast.success("Note deleted");
//       navigate("/");
//     } catch (error) {
//       console.error("Delete failed:", error);
//       toast.error("Failed to delete note");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleSave = async () => {
//     if (!note.title.trim() || !note.content.trim()) {
//       toast.error("Title and content are required");
//       return;
//     }

//     setSaving(true);

//     try {
//       await api.put(`/notes/${id}`, note);
//       toast.success("Note updated");
//     } catch (error) {
//       console.error("Update failed:", error);
//       toast.error("Failed to update note");
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-base-200 flex items-center justify-center">
//         <LoaderIcon className="animate-spin" size={30} />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-base-200">
//       <div className="container mx-auto px-4 py-8">
//         <div className="max-w-2xl mx-auto">
//           <div className="flex items-center justify-between mb-6">
//             <Link to="/" className="btn btn-ghost">
//               <ArrowLeftIcon className="h-5 w-5" />
//               Back to Notes
//             </Link>

//             <button
//               onClick={handleDelete}
//               className="btn btn-error btn-outline"
//               disabled={saving}
//             >
//               <Trash2Icon className="h-5 w-5" />
//               {saving ? "Deleting..." : "Delete Note"}
//             </button>
//           </div>

//           <div className="card bg-base-100 shadow">
//             <div className="card-body">
//               <div className="form-control mb-4">
//                 <label className="label">
//                   <span className="label-text">Title</span>
//                 </label>

//                 <input
//                   type="text"
//                   className="input input-bordered"
//                   placeholder="Enter note title"
//                   value={note.title || ""}
//                   onChange={(e) =>
//                     setNote((prev) => ({
//                       ...prev,
//                       title: e.target.value,
//                     }))
//                   }
//                 />
//               </div>

//               <div className="form-control mb-4">
//                 <label className="label">
//                   <span className="label-text">Content</span>
//                 </label>

//                 <textarea
//                   className="textarea textarea-bordered h-40"
//                   placeholder="Type your note here..."
//                   value={note.content || ""}
//                   onChange={(e) =>
//                     setNote((prev) => ({
//                       ...prev,
//                       content: e.target.value,
//                     }))
//                   }
//                 />
//               </div>

//               <div className="card-actions justify-end">
//                 <button
//                   className="btn btn-primary"
//                   onClick={handleSave}
//                   disabled={saving}
//                 >
//                   {saving ? (
//                     <>
//                       <LoaderIcon className="animate-spin h-4 w-4" />
//                       Saving...
//                     </>
//                   ) : (
//                     "Save Changes"
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NoteDetailPage;