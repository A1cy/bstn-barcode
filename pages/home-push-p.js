import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { BrowserMultiFormatReader, NotFoundException, BarcodeFormat, DecodeHintType } from '@zxing/library';

export default function Home() {
    const router = useRouter();
    const [showScanner, setShowScanner] = useState(false);
    const [sku, setSku] = useState('');
    const [productDetail, setProductDetail] = useState(null);
    const [error, setError] = useState('');
    const [isScanning, setIsScanning] = useState(false);

    const codeReader = new BrowserMultiFormatReader();
    const hints = new Map();
    hints.set(DecodeHintType.POSSIBLE_FORMATS, [
        BarcodeFormat.QR_CODE,
        BarcodeFormat.CODE_128,
        BarcodeFormat.CODE_39,
        BarcodeFormat.EAN_13
    ]);
    codeReader.hints = hints;

    const handleScanButtonClick = () => {
        setShowScanner(true);
        startScanning();
    };

    const startScanning = () => {
        setIsScanning(true);
        codeReader.decodeFromVideoDevice(undefined, 'barcode-scanner', (result, err) => {
            if (result) {
                setIsScanning(false);
                setSku(result.text);
            }
            if (err && !(err instanceof NotFoundException)) {
                setError("Failed to decode barcode.");
            }
        });
    };

    const stopScanning = () => {
        setIsScanning(false);
        codeReader.reset();
        setShowScanner(false);
    };

    const handleSearch = () => {
        router.push(`/productDetail?sku=${sku}`);
    };

    useEffect(() => {
        return () => {
            codeReader.reset();
        };
    }, []);

    return (
        <div className="container-home">
            <header className="home-header">
                <Image src="/pics/BuildStation-logo.png" alt="Logo" width={150} height={150} className="logo" layout="responsive" />
            </header>
            <main className="home-main">
                <button className="scan-button" onClick={handleScanButtonClick}>Start Scanning</button>
                <div className="form">
                    <input id="myInput" placeholder="Or enter SKU manually..." type="text" value={sku} onChange={(e) => setSku(e.target.value)} />
                    <button className="submit" onClick={handleSearch}>SUBMIT</button>
                </div>
                {error && <p className="error-message">{error}</p>}
                {productDetail && <div className="product-details"></div>}
            </main>
            {showScanner && (
                <div className="scanner-modal">
                    <div className="scanner-content">
                        <p className="scanner-instructions">Place the barcode inside the box below</p>
                        <div className="scanner-overlay">
                            <video id="barcode-scanner"></video>
                            <div className="guidelines"></div>
                        </div>
                        {isScanning ? <button className="stop-button" onClick={stopScanning}>Stop Scanning</button> : <button className="scan-button" onClick={startScanning}>Retry Scanning</button>}
                    </div>
                </div>
            )}
        </div>
    );
}
