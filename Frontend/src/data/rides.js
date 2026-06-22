import rahul from "../assets/drivers/rahul.png";
import aman from "../assets/drivers/aman.png";
import neha from "../assets/drivers/neha.png";

import swift from "../assets/cars/swift.png";
import amaze from "../assets/cars/amaze.png";
import nexon from "../assets/cars/nexon.png";

const rides = [
  {
    id: 1,
    name: "Rahul Sharma",
    time: "2 min away",
    rating: 4.8,
    trips: 230,
    price: 320,
    tag: "Best Match",
    avatar: rahul,
    carImage: swift,
    car: "Maruti Swift Dzire",
    features: ["Calm", "On-time", "Clean Car"],
  },
  {
    id: 2,
    name: "Aman Verma",
    rating: 4.7,
    trips: 180,
    price: 300,
    time: "4 min away",
    tag: "Great Value",
    avatar: aman,
    carImage: amaze,
    car: "Honda Amaze",
    features: ["Talkative", "Music Lover", "Pet Friendly"],
  },
  {
    id: 3,
    name: "Neha Joshi",
    rating: 4.9,
    trips: 150,
    time: "7 min away",
    price: 350,
    tag: "Eco Choice",
    avatar: neha,
    carImage: nexon,
    car: "Tata Nexon EV",
    features: ["Eco Friendly", "Smooth Ride", "Non-stop"],
  },
];

export default rides;
