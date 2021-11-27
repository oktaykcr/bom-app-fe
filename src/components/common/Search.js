import { FaSearch } from "react-icons/fa";

export default function Search({ value, setValue, onChange }) {
    return (
        <div className="form-control">
            <div className="relative">
                <input
                    name="search"
                    value={value || ""}
                    type="text"
                    placeholder="Search"
                    className="pr-16 input input-primary input-bordered"
                    onChange={e => {
                        setValue(e.target.value);
                        onChange(e.target.value);
                    }}
                    style={{
                        fontSize: '1.1rem'
                    }} />
                <FaSearch className="absolute top-3 right-3" size={20} />
            </div>
        </div>
    );
}