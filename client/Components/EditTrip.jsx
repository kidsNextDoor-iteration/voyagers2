// import React, { useEffect, useState} from 'react';

// const EditTrips = ( {fetchedTrip} ) => {

//   const editTrip = () => {     
//     fetch(`/editTrip?tripId=${tripId}`,
//     { method: 'PATCH'
//     }).then(res => {
//     if (res.ok) {
//       getTripDetails();
//     } else {
//       console.error('Error editing trip:', res.statusText);
//     }
//     }).catch(err => {
//       console.log('error in /editTrip in TripDetails.jsx')
//     })
//   }

//   return (
//     <div>
//       <form>
//         <div className="leftComponent">
//           <input>
//             <label htmlFor="title">What would you like to name this trip?</label><br/>
//             <input type="text" id="title"/><br/>

//             <label htmlFor="location">Location</label><br/>
//             <input type="text" id="location" placeholder={fetchedTrip.location}/><br/>

//             <label htmlFor="brand">Brand</label><br/>
//             <input type="text" id="brand"/><br/>
            
//             <label htmlFor="description">Description</label><br/>
//             <input type="text" id="description" className="larger-input"/><br/>

//             <label htmlFor="idea">Idea</label><br/>
//             <input type="text" id="idea" className="larger-input"/><br/>
//             </input>
//         </div>
//       </form>
//     </div>
//   )
// }

// export default EditTrips;