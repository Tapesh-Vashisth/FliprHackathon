import React from "react";
import { Routes, Route } from "react-router-dom";
import PageLoader from "./components/Loaders/PageLoader";
const Error404 = React.lazy(() => import("./pages/Error404"));

function App() {
    return (
        <>
            <Routes>
                <Route path="/loader" element={<PageLoader />} />

                <Route
                    path="*"
                    element={
                        <React.Suspense fallback={<PageLoader />}>
                            <Error404 />
                        </React.Suspense>
                    }
                />
            </Routes>
        </>
    );
}

export default App;
