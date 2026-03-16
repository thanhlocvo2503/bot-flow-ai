import { Header } from './components';

// Pages
import { MainPage } from './pages';

const App = () => {
    return (
        <div className="flex flex-col h-screen bg-[#F1F5F9]">
            <Header />
            <MainPage />
        </div>
    );
};

export default App;
