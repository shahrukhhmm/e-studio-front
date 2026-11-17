// SearchBar.jsx

import React, { useEffect, useRef, useState } from "react";
import SearchSharpIcon from "@material-ui/icons/SearchSharp";
import CancelIcon from "@material-ui/icons/Cancel";
import '../assets/scss/SearchBar.scss';
import { useDispatch, useSelector } from "react-redux";
import { setFilteredPlaylists } from "../../actions/actions";

const SearchBar = () => {
    const [isSearchBarOpen, setSearchBarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const searchRef = useRef();
    const dispatch = useDispatch();
    const { playlists } = useSelector((state) => state.musicReducer);

    useEffect(() => {
        if (isSearchBarOpen) {
            searchRef.current.focus();
        }
    }, [isSearchBarOpen]);

    const handleSearchBarOpen = () => {
        setSearchBarOpen(!isSearchBarOpen);
    };

    const handleSearchQuery = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query) {
            const filtered = playlists.filter(playlist =>
                playlist.name.toLowerCase().includes(query.toLowerCase())
            );
            dispatch(setFilteredPlaylists(filtered));

            // Set suggestions (show top 3)
            setSuggestions(filtered.slice(0, 3));
        } else {
            dispatch(setFilteredPlaylists([]));
            setSuggestions([]);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
    };

    return (
        <div className={`${isSearchBarOpen ? "SearchBar open" : "SearchBar"}`}>
            <form onSubmit={handleSearch} className={"search-container"}>
                {isSearchBarOpen && (
                    <>
                        <SearchSharpIcon style={{ color: "grey" }} className="search-icon" fontSize="small" />
                        <input
                            id={"search-input"}
                            name={"searchQuery"}
                            value={searchQuery}
                            onChange={handleSearchQuery}
                            placeholder={"Search for tracks"}
                            type="text"
                            ref={searchRef}
                            onFocus={() => setSuggestions(playlists.slice(0, 3))} // Show suggestions on focus
                        />
                        {suggestions.length > 0 && (
                            <div className="suggestions">
                                {suggestions.map((suggestion) => (
                                    <div key={suggestion._id} className="suggestion">
                                        {suggestion.name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </form>
            {!isSearchBarOpen && (
                <div className={"SearchBar-customPlaceholderOpen"} onClick={handleSearchBarOpen}>
                    <SearchSharpIcon style={{ color: "grey" }} className="search-icon" fontSize="small" />
                    <p className={"hide"}>&nbsp;Search for songs / tracks</p>
                </div>
            )}
            {isSearchBarOpen && (
                <div className={"SearchBar-customPlaceholderClose"} onClick={handleSearchBarOpen}>
                    <CancelIcon style={{ color: "grey" }} className="cancel hide" fontSize="small" />
                </div>
            )}

        </div>
    );
};

export default SearchBar;
