// import React, { useState } from "react";
// import "../assets/scss/Premium.css";
// import { Toaster } from "react-hot-toast";
// import CardDetailsPopup from "../CardDetails";

// export default function Premium() {
//   const [popupOpen, setPopupOpen] = useState(false);

//   const handleOpenPopup = () => {
//     setPopupOpen(true);
//   };

//   const handleClosePopup = () => {
//     setPopupOpen(false);
//   };
//   return (
//     <>
//       <div className="bg-image">
//         <div className="container">
//           <div className="row">
//             <div className="col-md-12">
//               <div className="des">
//                 <h1>Get Premium Membership </h1>
//                 <h1>Plans</h1>
//                 <div className="info mt-4">
//                   <h2>
//                     Unlock the power of E-Studio with our best plan for artists.
//                   </h2>
//                   <p>* Discount applies only to first year of subscription.</p>
//                   <button className="btn-3">Get Started</button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="container">
//           <div className="row">
//             <div className="col-md-10 py-3">
//               <div className="Tag text-center mt-5 py-5">
//                 <h1>Available plans.</h1>
//               </div>
//             </div>
//           </div>
//           <div className="py-4">
//             <div className="card" style={{ display: "flex", gap: "20px" }}>
//               <div className="col-md-6 text-center">
//                 <div className="Plans card py-4">
//                   <h1>Monthly</h1>
//                   <p>Starting at</p>
//                   <h5>999 Rs /Month</h5>
//                   <button className="btn-4" onClick={handleOpenPopup}>Buy Now</button>
//                 </div>
//               </div>
//               <div className="col-md-6 text-center">
//                 <div className="Plans card py-4">
//                   <h1>Yearly</h1>
//                   <p>Starting at</p>
//                   <h5>9900 Rs /Year</h5>
//                   <button className="btn-4" onClick={handleOpenPopup}>Buy Now</button>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-12">
//               <div className="plans-des mt-5">
//                 <h5> Package includes</h5>
//                 <p className="mt-3">
//                   <i class="fa-solid fa-check"></i> Unlimited track uploads
//                 </p>
//                 <p>
//                   <i class="fa-solid fa-check"></i> Extended reach with up to
//                   100+ First Fans listener autoplay recommendations on new
//                   uploads
//                 </p>
//                 <p>
//                   <i class="fa-solid fa-check"></i> Unlimited distribution to
//                   Spotify, Apple Music, TikTok, and more
//                 </p>
//                 <p>
//                   <i class="fa-solid fa-check"></i> Advanced fan insights and
//                   custom listening reports
//                 </p>
//                 <p>
//                   <i class="fa-solid fa-check"></i> 3 free Mastering credits
//                   each month
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <CardDetailsPopup open={popupOpen} handleClose={handleClosePopup} />
//     </>
//   );
// }
// Updated code 


import React, { useState } from "react";
import "../assets/scss/Premium.css";
import { Toaster } from "react-hot-toast";
import CardDetailsPopup from "../CardDetails";

export default function Premium() {
  const [popupOpen, setPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  return (
    <>
      <div className="bg-image">

        <div className="container">


          <div className="row">
            <div className="col-md-12">
              <div className="des">
                <h1>Get Premium Membership</h1>
                <h1>Plans.</h1>
                <div className="info mt-4">
                  <h2>
                    Unlock the power of E-Studio with our best plan for artists.
                  </h2>
                  <p>* Discount applies only to first year of subscription.</p>
                  {/* <button className="btn-3">Get Started</button> */}
                </div>
              </div>
            </div>


          </div>



          <div className="row">
            <div className="col-md-10 py-3">
              <div className="Tag text-center mt-5 py-5">
                <h1>Available plans.</h1>
              </div>
            </div>
          </div>
          <div className="py-4">
            <div className="card" style={{ display: "flex", gap: "20px" }}>
              <div className="col-md-6 text-center">
                <div className="Plans card py-4">
                  <h1>Monthly</h1>
                  <p>Starting at</p>
                  <h5>999 Rs /Month</h5>
                  <button className="btn-4" onClick={handleOpenPopup}>Buy Now</button>
                </div>
              </div>
              <div className="col-md-6 text-center">
                <div className="Plans card py-4">
                  <h1>Yearly</h1>
                  <p>Starting at</p>
                  <h5>9900 Rs /Year</h5>
                  <button className="btn-4" onClick={handleOpenPopup}>Buy Now</button>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="plans-des mt-5">
                <h5> Package Includes</h5>

                <p>
                  <i className="fa-solid fa-check"></i> High-Quality Audio
                </p>
                <p className="mt-3">
                  <i className="fa-solid fa-check"></i> Unlimited track uploads
                </p>
                <p>
                  <i className="fa-solid fa-check"></i> Enjoy uninterrupted music without any ads
                </p>

                <p>
                  <i className="fa-solid fa-check"></i>
                  Send direct messages to your fans and followers.
                </p>
                <p>
                  <i className="fa-solid fa-check"></i> Promote your concerts and events to a wider audience.
                </p>

                <p>
                  <i className="fa-solid fa-check"></i>  Access exclusive releases, early previews, and behind-the-scenes content.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
      <CardDetailsPopup open={popupOpen} handleClose={handleClosePopup} />
    </>
  );
}
