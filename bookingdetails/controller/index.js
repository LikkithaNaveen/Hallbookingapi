let rooms = [{
    roomId:"R1",
    seatsAvailable:"10",
    amenities:"TV,Ac",
    pricePerHour:"100"
},
{
  roomId:"21",
  seatsAvailable:"15",
  amenities:"TV,Ac,fridge",
  pricePerHour:"150"
},
{
  roomId:"R3",
  seatsAvailable:"18",
  amenities:"TV,Ac ,special care",
  pricePerHour:"190"
}];
let bookings = [{
    customer: "likkitha",
    bookingDate:"11/10/2023",
    startTime: "5:00pm",
    endTime: "11:59am",
    roomId: "R3",
    status: "booked" 
},{
  customer: "Dheena",
  bookingDate:"10/10/2023",
  startTime: "12:00pm",
  endTime: "11:59am",
  roomId: "R1",
  status: "booked" 
},{
  customer: "susmitha",
  bookingDate:"03/11/2023",
  startTime: "08:00pm",
  endTime: "11:59am",
  roomId: "R1",
  status: "booked" 
}
];
let customers = [
    { name: 'Dheena',
     bookings: [ 
        {
            customer: 'Dheena',
            bookingDate:"10/10/2023",
            startTime: '12:00pm',
            endTime: '11:59am',
            roomId: 'R1',
            status: 'booked'  
          }
      ] },
      { name: 'likkitha',
     bookings: [ 
        {
            customer: 'likkitha',
            bookingDate:"10/10/2023",
            startTime: '12:00pm',
            endTime: '11:59am',
            roomId: 'R1',
            status: 'booked'  
          }
      ] },
      { name: 'Dheena',
     bookings: [ 
        {
            customer: 'Dheena',
            bookingDate:"10/10/2023",
            startTime: '12:00pm',
            endTime: '11:59am',
            roomId: 'R1',
            status: 'booked'  
          }
      ] }
];

// List all Rooms and its details
const getAllRooms=(req, res)=> {
    res.status(200).send({
      message:"RoomData Fetched Successfully",
      count:rooms.length,
      RoomsList : rooms});
  }

const createRoom=(req,res) => {
    const room = req.body;
    const idExists = rooms.find((el)=> el.roomId === room.roomId)
    if(idExists !== undefined){
        return res.status(400).send({message:"Room already exists."});
    }
    else{
    rooms.push(room);
    res.status(201).send({message:"Room created successfully"});
}
}

const getAllBookedRooms=(req,res) => {
    const bookedRooms = bookings.map(booking => {
        const {roomId ,status,customer,bookingDate,startTime,endTime} = booking;
        return {roomId ,status,customer,bookingDate,startTime,endTime} 
    });
    res.status(201).send(bookedRooms);
}

//List all the customers with booked data
const getAllCustomers=(req, res) => {
    const customerBookings = customers.map(customer => {
      const { name, bookings } = customer;
      const customerDetails = bookings.map(booking => {
        const { roomId, bookingDate, startTime, endTime } = booking;
        return { name, roomId, bookingDate, startTime, endTime };
      });
     
      return customerDetails;
    })
   
    res.send(customerBookings);
  }

// List how many times the user booked the room
 const getBookingCountByCustomer=(req, res) => {
    const { name } = req.params;
    const customer = customers.find(cust => cust.name === name);
    if (!customer) {
      res.status(404).send({ error: 'Customer not found' });
      return;
    }
    const customerBookings = customer.bookings.map(booking => {
      const { customer,roomId, startTime, endTime, status, bookingDate} = booking;
      return { customer, roomId, startTime, endTime, status, bookingDate};
    });
    res.send({
        count:customerBookings.length,
        customerBookings});
  }
module.exports = {
    getAllRooms,
     createRoom,
   getAllBookedRooms,
    getAllCustomers,
    getBookingCountByCustomer
}