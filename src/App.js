import Header from './components/header';
import './App.css';
import { WagmiConfig, createConfig } from "wagmi";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from './pages/Home';
import Certify from './pages/Certify';
import { sepolia } from "wagmi/chains";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const chains = [sepolia];
const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    alchemyId: 'EbWpcrEoNB5gzeDJi_clFzLbpbgTtuRt', // or infuraId
    walletConnectProjectId: '409ca735da2a96e0fc9c913a4093d95b',
    chains,

    // Required
    appName: "BlokCert",

    // Optional
    // appDescription: "Your App Description",
    // appUrl: "https://family.co", // your app's url
    // appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  }),
);
function App() {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider>
        <div className='w-full h-full bg-[#09213d]'>
          <Header/>
          <Routes>
              <Route
              path="/"
              element={<Home/>}
            />
      
              <Route
              path="/certify"
              element={<Certify/>}
            />
          </Routes>
        </div>
        <ToastContainer />
      </ConnectKitProvider>
    </WagmiConfig>
  ); 
}

export default App;
