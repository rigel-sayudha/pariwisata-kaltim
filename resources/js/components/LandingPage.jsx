import React from 'react';

const LandingPage = () => {
    return (
        <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', padding: '20px' }}>
            <header style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 0' }}>
                <h1>Welcome to Pariwisata Kaltim</h1>
                <p>Explore the beauty of East Kalimantan</p>
            </header>
            <main style={{ marginTop: '20px' }}>
                <section>
                    <h2>Discover Amazing Destinations</h2>
                    <p>Find the best places to visit in East Kalimantan.</p>
                </section>
                <section style={{ marginTop: '30px' }}>
                    <h2>Plan Your Trip</h2>
                    <p>Get tips and guides for an unforgettable experience.</p>
                </section>
            </main>
            <footer style={{ marginTop: '40px', backgroundColor: '#f1f1f1', padding: '10px 0' }}>
                <p>&copy; 2025 Pariwisata Kaltim. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default LandingPage;