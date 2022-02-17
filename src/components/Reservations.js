import React from 'react';
import axios from 'axios';
import "./Reservations.css";

const RAILS_RESERVATIONS_CREATE_BASE_URL = "http://localhost:3000/reservations" 



export default class Reservations extends React.Component{

    componentDidMount() {
        console.log("reservations: ");
        this.getReservations();
    }
    

    getReservations = async () => {
        console.log("hello")
        try{
            const res = await axios.get( RAILS_RESERVATIONS_CREATE_BASE_URL);
            console.log("Reservations Response: ",res.data);
        }catch(err){
            console.log('ERROR loading AJAX secrets: ',err);
        }
    }//get Reservations


    render(){
        return(

            <div>
                <p>My Reservations</p>
                
            </div>
        )
    };

}



