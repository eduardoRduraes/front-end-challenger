import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { BaseLayout } from "./shared/layout";

const App = () => {

    return (
        <BaseLayout>
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </BaseLayout>
    );
};

export default App;
