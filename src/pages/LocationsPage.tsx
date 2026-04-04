interface StoreInfo {
  name: string;
  type: string;
  hours: string[];
  address: string;
  comingSoon?: boolean;
  btnLabel?: string;
}

const stores: StoreInfo[] = [
  {
    name: "Brooki Fortitude Valley",
    type: "Flagship Store - Open 7 Days",
    hours: ["8:00am – 3:30pm Weekdays", "8:00am – 3:00pm Weekends"],
    address: "15 Marshall Street, Fortitude Valley",
  },
  {
    name: "Brooki Brisbane CBD",
    type: "Kiosk - Open 7 Days",
    hours: [
      "9:00am – 4:00pm",
      "9:00am – 9:00pm Fridays",
      "11:00am – 4:00pm Sundays",
    ],
    address: "Queens Plaza Lower Ground Level",
  },
  {
    name: "Brooki Chermside",
    type: "Kiosk - Open 7 Days",
    hours: ["Monday – Saturday 9:00am – 5:00pm", "Thursdays til 9:00pm"],
    address: "Westfield Chermside, Near Glassons",
  },
  {
    name: "Brooki Pacific Fair",
    type: "Kiosk - Open 7 Days",
    hours: [
      "Monday – Saturday 8:30am – 5:30pm",
      "Thursdays til 9:00pm, Sundays 9:00am – 4:00pm",
    ],
    address: "Pacific Fair Shopping Centre, near Coles",
  },
  {
    name: "Brooki Brisbane Airport",
    type: "Kiosk - Open 7 Days",
    hours: ["6:00am – 7:00pm daily"],
    address: "Gate 25, Domestic Airport",
  },
  {
    name: "Brooki Sydney Airport",
    type: "Kiosk - Open 7 Days",
    hours: ["6:00am – 8:30pm daily"],
    address: "Terminal 2, Domestic Airport",
  },
  {
    name: "Brooki Broadbeach",
    type: "Coming soon!",
    hours: [],
    address: "88 Surf Parade, Broadbeach",
    comingSoon: true,
  },
  {
    name: "Brooki South Brisbane",
    type: "Coming soon!",
    hours: [],
    address: "109 Melbourne Street, South Brisbane",
    comingSoon: true,
  },
  {
    name: "Brooki Chadstone",
    type: "Coming soon!",
    hours: [],
    address: "1341 Dandenong Road, Chadstone",
    comingSoon: true,
  },
  {
    name: "Brooki Dubai",
    type: "Kiosk - Open 7 Days",
    hours: ["4:00pm – 12:00am daily"],
    address: "Marsa Boulevard",
    btnLabel: "Button label",
  },
  {
    name: "Brooki Abu Dhabi",
    type: "Kiosk - Open 7 Days",
    hours: ["12:00pm – 10:00pm daily"],
    address: "Natural History Museum, Saadiyat",
  },
  {
    name: "Brooki Sharjah",
    type: "Kiosk - Open 7 Days",
    hours: ["12:00pm – 10:00pm daily"],
    address: "Aljada",
  },
];

function StoreCard({ store }: { store: StoreInfo }) {
  return (
    <div className="loc-card">
      <div className="loc-card-left">
        <h3 className="loc-store-name">{store.name}</h3>
        <p
          className={`loc-store-type${store.comingSoon ? " coming-soon" : ""}`}
        >
          {store.type}
        </p>
        {store.hours.map((h, i) => (
          <p key={i} className="loc-hours">
            {h}
          </p>
        ))}
        <p className="loc-address">{store.address}</p>
      </div>
      <div className="loc-card-right">
        <a className="loc-directions-btn" onClick={() => {}}>
          {store.btnLabel ?? "Get Directions"}
        </a>
      </div>
    </div>
  );
}

export default function LocationsPage() {
  return (
    <>
      <style>{`
        .loc-page {
          font-family: 'Lato', sans-serif;
          background: #fff;
          color: #1a1a1a;
          min-height: 80vh;
        }

        .loc-breadcrumb {
         padding: 20px  0;
         font-size: 12.5px;
         color: #888;
         display: flex;
         align-items: center;
         gap: 6px;
         justify-content: center;
         max-width: 900px;   
         margin: 0 auto;    
      }
        .loc-breadcrumb a {
          color: #888;
          text-decoration: none;
          transition: color 0.2s;
        }
        .loc-breadcrumb a:hover { color: #1a1a1a; }
        .loc-breadcrumb-sep { font-size: 10px; color: #ccc; }
        .loc-breadcrumb-current { color: #1a1a1a; }

        .loc-hero {
         padding: 36px 0px 48px;
         border-bottom: 1px solid #f0ece8;
         margin-bottom: 0;
         text-align: center;
         max-width: 900px;   
         margin-left: auto;  
         margin-right: auto; 
        }
        .loc-hero-label {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          font-weight: 600;
          color: #1a1a1a;
          margin: 0 0 25px;
          letter-spacing: -0.02em;
          line-height: 1.15;
        }
        .loc-hero-title {
        font-size: 15px;
          font-weight: 500;
          color: #1a1a1a;
          letter-spacing: 0.08em;
          margin: 0 0 12px;
          margin: 0 auto;
        }

        .loc-list {
          max-width: 900px;
          padding: 0 0px 80px;
          margin: 0 auto;
        }

        .loc-card {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding: 32px 0;
          border-bottom: 1px solid #f0ece8;
          gap: 24px;
        }
        .loc-card:last-child { border-bottom: none; }

        .loc-card-left {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .loc-store-name {
          font-family: 'Playfair Display', serif;
          font-size: 2.2rem;
          font-weight: 600;
          color: #1a1a1a;
          margin: 0 0 6px;
          letter-spacing: -0.01em;
        }

        .loc-store-type {
          font-size: 18px;
          font-weight: 600;
          color: #1a1a1a;
          margin: 0 0 4px;
        }

        .loc-hours {
          font-size: 16px;
          color: #1a1a1a;
          margin: 0;
          line-height: 1.6;
        }

        .loc-address {
          font-size: 16px;
          color: #1a1a1a;
          margin: 6px 0 0;
          line-height: 1.6;
        }

        .loc-card-right {
          flex-shrink: 0;
          padding-top: 4px;
        }

        .loc-directions-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #1a1a1a;
          color: #fff;
          text-decoration: none;
          border-radius: 9999px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 12px 22px;
          font-family: 'Lato', sans-serif;
          white-space: nowrap;
          transition: background 0.2s ease;
        }
        .loc-directions-btn:hover { background: #3d2b1f; }
        
        @media (max-width: 768px) {
          .loc-breadcrumb,
          .loc-hero,
          .loc-list { padding-left: 24px; padding-right: 24px; }
          .loc-card {
            flex-direction: column;
            gap: 16px;
          }
          .loc-card-right { width: 100%; }
          .loc-directions-btn { width: 100%; text-align: center; }
        }
      `}</style>

      <div className="loc-page">
        <div className="loc-breadcrumb">
          <a href="/">Home</a>
          <span className="loc-breadcrumb-sep">›</span>
          <span className="loc-breadcrumb-current">Our Locations</span>
        </div>

        <div className="loc-hero">
          <p className="loc-hero-label">Find a Store</p>
          <h1 className="loc-hero-title">Find a Brooki store near you</h1>
        </div>

        <div className="loc-list">
          {stores.map((store) => (
            <StoreCard key={store.name} store={store} />
          ))}
        </div>
      </div>
    </>
  );
}
