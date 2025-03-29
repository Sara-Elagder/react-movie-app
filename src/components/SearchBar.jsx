import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (

          <div className="mt-4">
            <div className="d-flex align-items-center">
              <input
                type="text"
                className="form-control border-1 px-3 me-3"
                placeholder="Search and explore...."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                style={{
                  height: "46px",
                  borderRadius: "10px",
                  boxShadow: "none",
                  fontSize: "1rem",
                  flex: 1
                }}
              />
              <button
              type="submit"
                className="btn  d-flex align-items-center justify-content-center "
                onClick={handleSearch}
                style={{
                  width: "120px",
                  height: "46px",
                  borderRadius: "10px",
                  padding: "0",
                  flexShrink: 0,
                  background: "#FFE353"
                }}
              >

                <span>Search</span>
              </button>
            </div>
          </div>
       
  );
};

export default SearchBar;