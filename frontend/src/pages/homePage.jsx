import { useEffect } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(true);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() =>{
    const fetchNotes = async () => {
      try {
        const response = await fetch("/api/notes");
        const data = await response.json();
        setNotes(data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchNotes(); 
  }, [])

  return (
    <div className="min-h-screen">
      <Navbar/>
      { isRateLimited && <RateLimitedUI /> }
    </div>
  )
}

export default HomePage;
