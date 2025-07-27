import React from "react";
import { useParams } from "react-router-dom";
import poster from "../../src/assets/Screenshot 2025-07-16 162638.png"
import AttendeeNavBar from "../../components/AttendeeNavBar";

const mockEvents = {
  "1": {
    title: "Nairobi Music Festival 2025",
    date: "August 15, 2025",
    time: "6:00 PM - 11:00 PM",
    location: "KICC Grounds, Nairobi",
    description:
      "Join us for an unforgettable night of music, food, and vibes. Featuring top Kenyan artists, DJs, and live performances.",
    image: "https://images.unsplash.com/photo-1601997302202-d1b6d2ad007d?fit=crop&w=800&h=1100&q=80",
    tickets: [
      { id: 1, type: "VIP", price: 5000, perks: ["Lounge", "Drinks"], available: 50 },
      { id: 2, type: "Regular", price: 2500, perks: ["Access to show"], available: 200 },
    ],
  },
  "2": {
    title: "Tech Expo Nairobi",
    date: "September 10, 2025",
    time: "9:00 AM - 5:00 PM",
    location: "Sarit Expo Centre",
    description: "A showcase of Kenya's top tech startups, innovations, and panels.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?fit=crop&w=1200&q=80",
    tickets: [
        { id: 1, type: "General", price: 1000, perks: ["Expo Access"], available: 300 },
    ],
  },
};

const EventDetails = () => {
    const { id } = useParams();
    const event = mockEvents[id];

    if (!event) {
        return <p className="text-center text-red-500">Event not found.</p>;
    }
    return (
       <div className="max-w-4xl mx-auto flex">
        <AttendeeNavBar/>
        <div className="mx-6 my-4">
            <div>
               <img src={poster}/>
            </div>
            <p>{event.description}</p>
        </div>
        <div>
        <div>
            <p>{event.title}</p>
            <div>
                <p>{event.date}</p>
                <p>{event.time}</p>
                <p>{event.location}</p>
            </div>
        </div>
        <div>
            <h2>Tickets</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {event.tickets.map((ticket) => (
                    <div key={ticket.id} className="border rounded-lg p-4 shadow bg-white">
                        <h3 className="font-bold text-lg mb-1">{ticket.type} - KES {ticket.price}</h3>
                        <ul className="list-disc list-inside text-sm text-gray-600 mb-2">
                            {ticket.perks.map((p, i) => (
                                <li key={i}>{p}</li>
                            ))}
                        </ul>
                        <p className="text-gray-500 text-sm">{ticket.available} left</p>
                        <button className="mt-3 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
                            Buy Ticket
                        </button>
                     </div>
                ))}
            </div>
        </div>
        </div>
       </div> 
    );
};

export default EventDetails;
