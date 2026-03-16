import { Header } from './components';

// Pages
import { MainPage } from './pages';

const App = () => {
    return (
        <div className="flex flex-col min-h-dvh bg-[#F1F5F9]">
            <Header />
            <MainPage />
        </div>
    );
};

export default App;
