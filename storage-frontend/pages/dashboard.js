import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const [storages, setStorages] = useState([]);
    const router = useRouter();

    useEffect(() => {
        axios.get("https://your-backend-url.onrailway.app/storages")
            .then(res => setStorages(res.data))
            .catch(err => console.log(err));
    }, []);

    const handleBooking = async (storageId) => {
        const userId = 1; 
        await axios.post("https://your-backend-url.onrailway.app/book", { userId, storageId, paymentMethod: "cash" });
        alert("Booking Successful");
    };

    return (
        <div>
            <h2>Available Storage Facilities</h2>
            {storages.map(storage => (
                <div key={storage.id}>
                    <h3>{storage.type} - {storage.location}</h3>
                    <p>Available Slots: {storage.availableSlots}</p>
                    <button onClick={() => handleBooking(storage.id)}>Book</button>
                </div>
            ))}
        </div>
    );
}
