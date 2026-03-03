import React from 'react';

const DestinationPage = () => {
    return (
        <div>
            {/* Navbar */}
            <nav style={{ backgroundColor: '#4CAF50', padding: '10px', color: 'white' }}>
                <h1 style={{ margin: 0 }}>Pariwisata Kaltim</h1>
            </nav>

            {/* Slider */}
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <img
                    src="/images/slider1.jpg"
                    alt="Slider"
                    style={{ width: '80%', borderRadius: '10px' }}
                />
            </div>

            {/* Content */}
            <main style={{ padding: '20px', textAlign: 'center' }}>
                <h2>Destinasi Wisata</h2>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                    <div style={{ border: '1px solid #ddd', padding: '10px', width: '200px' }}>
                        <img
                            src="/images/destination1.jpg"
                            alt="Destination 1"
                            style={{ width: '100%', borderRadius: '5px' }}
                        />
                        <h3>Destinasi 1</h3>
                        <p>Deskripsi singkat destinasi 1.</p>
                    </div>
                    <div style={{ border: '1px solid #ddd', padding: '10px', width: '200px' }}>
                        <img
                            src="/images/destination2.jpg"
                            alt="Destination 2"
                            style={{ width: '100%', borderRadius: '5px' }}
                        />
                        <h3>Destinasi 2</h3>
                        <p>Deskripsi singkat destinasi 2.</p>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer style={{ backgroundColor: '#f1f1f1', padding: '10px', textAlign: 'center' }}>
                <p>&copy; 2025 Pariwisata Kaltim. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default DestinationPage;