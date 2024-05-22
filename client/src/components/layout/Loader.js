import React, { useState } from "react";
import DotLoader from "react-spinners/DotLoader";

const Loader = () => {
    const [loading, setLoading] = useState(true);
    const [color, setColor] = useState("#ffffff");

    const override = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
    };

    return (
        <div className="sweet-loading">
            <button onClick={() => setLoading(!loading)}>Toggle Loader</button>
            <input
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="Color of the loader"
            />

            <DotLoader
                color={color}
                loading={loading}
                css={override}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );
};

export default Loader;
