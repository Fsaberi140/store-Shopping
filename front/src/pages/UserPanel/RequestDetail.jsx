import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import CartService from "../../service/cartService";
import DatePicker from "react-datepicker";
import {
  showErrorMessageByAxiosError,
  showSuccessMessage,
} from "../../utilitis/toaster";
import ReactToPrint from "react-to-print";
import moment from "moment";
import { DATE_FORMAT_STANDARD } from "../ProductDetails.jsx/productDetail";

const STATUS_ACCEPT = 1;
const STATUS_REJECT = 2;

// show cart detail and status
const RequestDetail = () => {
  // id of request
  const { requestId } = useParams();
  // detail of request
  const [data, setData] = useState();
  const navigate = useNavigate();
  const printBox = useRef();
  // state for handle status change
  const [status, setStatus] = useState(STATUS_REJECT);
  // state for accept description or reject reason
  const [textareaValue, setTextareaValue] = useState("");

  // get detail of request
  // useEffect(() => {
  //   CartService.getRequestDetail(requestId)
  //     .then((res) => {
  //       setData(res.data);
  //     })
  //     .catch((err) => showErrorMessageByAxiosError(err));
  // }, []);

  // reset textinput on status change
  useEffect(() => {
    setTextareaValue("");
  }, [status]);

  if (!data) return <p>loading ...</p>;

  // accept request by request id and description
  function handleAccept() {
    // CartService.acceptRequest(requestId, textareaValue)
    //   .then((res) => {
    //     showSuccessMessage("Successfully accepted");
    //     navigate(-1);
    //   })
    //   .catch((err) => showErrorMessageByAxiosError(err));
  }

  // reject request by request id and reason
  function handleReject() {
    // CartService.rejectedRequest(requestId, textareaValue)
    //   .then((res) => {
    //     showSuccessMessage("Successfully rejected");
    //     navigate(-1);
    //   })
    //   .catch((err) => showErrorMessageByAxiosError(err));
  }

  // calculate request days difference
  const totalDays = Math.ceil(
    moment.duration(moment(data.endDate).diff(data.startDate)).asDays()
  );
  return (
    <div className="requestDetail">
      <img src={data.product.image} width={200} alt="" />
      <h3>{data.product.title}</h3>
      <DatePicker
        excludeDateIntervals={[
          {
            start: new Date(data.startDate),
            end: new Date(data.endDate),
          },
        ]}
        inline
      />
      <p>Status : {data.status}</p>
      {data.status === "Pending" && (
        <>
          <div className="radioContainer">
            <label>
              <input
                checked={status === STATUS_ACCEPT}
                onClick={() => setStatus(STATUS_ACCEPT)}
                type="radio"
              />
              Accept
            </label>
            <label>
              <input
                checked={status === STATUS_REJECT}
                onClick={() => setStatus(STATUS_REJECT)}
                type="radio"
              />
              Reject
            </label>
          </div>
          {status === STATUS_ACCEPT && (
            <div className="boxAccept">
              <textarea
                value={textareaValue}
                onChange={(e) => setTextareaValue(e.target.value)}
                placeholder="if you want something write it, and it will be added at the end of the cart"
              />
            </div>
          )}
          {status === STATUS_REJECT && (
            <div className="boxReject">
              <textarea
                placeholder="write your reason"
                value={textareaValue}
                onChange={(e) => setTextareaValue(e.target.value)}
              />
            </div>
          )}
          <div>
            {status === STATUS_ACCEPT ? (
              <>
                <button className="btn btn-primary" onClick={handleAccept}>
                  Accept
                </button>
                <ReactToPrint
                  trigger={() => (
                    <button className="btn btn-warning">Print Cart</button>
                  )}
                  content={() => printBox.current}
                />
              </>
            ) : (
              <button className="btn btn-danger" onClick={handleReject}>
                Reject
              </button>
            )}
          </div>
          {status === STATUS_ACCEPT && (
            <div className="cartBox" ref={printBox}>
              <h3>Rental Cart</h3>
              <p> Location, on …………………………… </p>
              <p>
                {" "}
                For the rental of The rental objects <b>{data.product.title}</b>
                . From lessor the{" "}
                <b>
                  {data.productOwner.firstName +
                    " " +
                    data.productOwner.lastName}
                </b>{" "}
                accepts the tenant{" "}
                <b>
                  {data.productRequester.firstName +
                    " " +
                    data.productRequester.lastName}
                </b>{" "}
                the following
              </p>
              <h3>agreement in its entirety:</h3>
              <ul>
                <li>
                  Subject of the cart:
                  <p>
                    The rental object is <b>{data.product.title}</b> In further
                    cart this article is called rental object.
                  </p>
                </li>
                <li>
                  Rental period, technical equipment data, accessories and
                  prices as per offer/order:
                  <p>
                    Exceeding the agreed rental period is generally not
                    permitted without consultation and consent of the lessor and
                    may be charged by the lessor with a surcharge in the amount
                    of one week's rent.
                  </p>
                </li>
                <li>
                  Deposit: (voluntary agreement):
                  <p>
                    The hirer shall pay a deposit for the rental object to the
                    lessor upon collection. The agreed deposit is to be paid
                    (exclusively in CASH) and will be refunded (less the rental
                    costs including incidental costs) upon return of the rental
                    object. <br />
                    In the event of major damage to the rented property, the
                    lessor reserves the right to retain the deposit in full
                    until the repair costs incurred have been clarified and a
                    settlement is possible.
                  </p>
                </li>
                <li>
                  The current status of the rental item
                  <p>
                    The parties to the cart take photos of the rented goods and
                    store the photos in a safe place.
                  </p>
                </li>
                <li>
                  Duties of the tenant:
                  <p>
                    The unit is the property of the lessor. The tenant is
                    obliged to handle the rental object with care. Under no
                    circumstances is the lessee permitted to open the device /
                    make changes to the hardware. Otherwise, the device must be
                    inspected by the lessor at the lessor's expense (charged
                    according to time spent and damage incurred). In the event
                    of damage to the rental object, loss or theft, the lessee is
                    obliged to inform the lessor immediately.
                  </p>
                </li>
                <li>
                  Liability of the tenant:
                  <p>
                    Damage to the rented property resulting from improper use
                    must be borne by the tenant. The costs of repairs are to be
                    borne by the tenant up to a maximum amount of the deposit.
                    In the event of loss or theft of or damage to the rented
                    property, the landlord shall retain the entire deposit paid.
                    If necessary, a report of the theft must be made by the
                    tenant and the transcript submitted to the landlord.
                  </p>
                </li>
                <li>
                  Cancellation conditions:
                  <p>
                    Cancellation up to 2 days before the agreed date of arrival.
                  </p>
                </li>
                <li>
                  Further information:
                  <p>
                    Additional work requested by the hirer (for example
                    installation of special software or equipment, data transfer
                    etc.) will be charged by the hirer at the current hourly
                    rate. <br />
                    The hirer must have a valid official photo ID with him/her
                    at the time of collection. A copy of this will be kept
                    securely with the deposit by the lessor. This copy of the ID
                    will be destroyed at the end of the rental period. <br />
                    The tenant confirms with his/her signature that he/she has
                    checked the rental object for functionality before taking it
                    over and declares that he/she fully agrees with all the
                    above points of this rental agreement. <br />
                    The Lessor confirms with his signature the receipt of:{" "}
                    <br />
                    Rental Costs EUR {(+data.product.price).toFixed(2)} <br />
                    Days {totalDays}. <br /> <br />
                    _______________ <br />
                    GESAMTKOSTEN: EUR{" "}
                    {(totalDays * data.product.price).toFixed(2)} <br />
                  </p>
                </li>
              </ul>

              <footer>
                <div> Product Owner Signature </div>
                <div> Borrower Signature </div>
              </footer>
            </div>
          )}
        </>
      )}
      {data.status === "Accepted" && (
        <>
          <ReactToPrint
            trigger={() => (
              <button className="btn btn-warning">Print Cart</button>
            )}
            content={() => printBox.current}
          />
          <div className="cartBox" ref={printBox}>
            <h3>Rental Cart</h3>
            <p>Location, on …………………………… </p>

            <p>
              {" "}
              For the rental of The rental objects <b>{data.product.title}</b>.
              From lessor the{" "}
              <b>
                {data.productOwner.firstName + " " + data.productOwner.lastName}
              </b>{" "}
              accepts the tenant{" "}
              <b>
                {data.productRequester.firstName +
                  " " +
                  data.productRequester.lastName}
              </b>{" "}
              the following
            </p>
            <h3>agreement in its entirety:</h3>
            <ul>
              <li>
                Subject of the cart:
                <p>
                  The rental object is <b>{data.product.title}</b> In further
                  cart this article is called rental object.
                </p>
              </li>
              <li>
                Rental period, technical equipment data, accessories and prices
                as per offer/order:
                <p>
                  Exceeding the agreed rental period is generally not permitted
                  without consultation and consent of the lessor and may be
                  charged by the lessor with a surcharge in the amount of one
                  week's rent.
                </p>
              </li>
              <li>
                Deposit: (voluntary agreement):
                <p>
                  The hirer shall pay a deposit for the rental object to the
                  lessor upon collection. The agreed deposit is to be paid
                  (exclusively in CASH) and will be refunded (less the rental
                  costs including incidental costs) upon return of the rental
                  object. <br />
                  In the event of major damage to the rented property, the
                  lessor reserves the right to retain the deposit in full until
                  the repair costs incurred have been clarified and a settlement
                  is possible.
                </p>
              </li>
              <li>
                The current status of the rental item
                <p>
                  The parties to the cart take photos of the rented goods and
                  store the photos in a safe place.
                </p>
              </li>
              <li>
                Duties of the tenant:
                <p>
                  The unit is the property of the lessor. The tenant is obliged
                  to handle the rental object with care. Under no circumstances
                  is the lessee permitted to open the device / make changes to
                  the hardware. Otherwise, the device must be inspected by the
                  lessor at the lessor's expense (charged according to time
                  spent and damage incurred). In the event of damage to the
                  rental object, loss or theft, the lessee is obliged to inform
                  the lessor immediately.
                </p>
              </li>
              <li>
                Liability of the tenant:
                <p>
                  Damage to the rented property resulting from improper use must
                  be borne by the tenant. The costs of repairs are to be borne
                  by the tenant up to a maximum amount of the deposit. In the
                  event of loss or theft of or damage to the rented property,
                  the landlord shall retain the entire deposit paid. If
                  necessary, a report of the theft must be made by the tenant
                  and the transcript submitted to the landlord.
                </p>
              </li>
              <li>
                Cancellation conditions:
                <p>
                  Cancellation up to 2 days before the agreed date of arrival.
                </p>
              </li>
              <li>
                Further information:
                <p>
                  Additional work requested by the hirer (for example
                  installation of special software or equipment, data transfer
                  etc.) will be charged by the hirer at the current hourly rate.{" "}
                  <br />
                  The hirer must have a valid official photo ID with him/her at
                  the time of collection. A copy of this will be kept securely
                  with the deposit by the lessor. This copy of the ID will be
                  destroyed at the end of the rental period. <br />
                  The tenant confirms with his/her signature that he/she has
                  checked the rental object for functionality before taking it
                  over and declares that he/she fully agrees with all the above
                  points of this rental agreement. <br />
                  The Lessor confirms with his signature the receipt of: <br />
                  Rental Costs EUR {(+data.product.price).toFixed(2)} <br />
                  Days {totalDays}. <br /> <br />
                  _______________ <br />
                  GESAMTKOSTEN: EUR{" "}
                  {(totalDays * data.product.price).toFixed(2)} <br />
                </p>
              </li>
            </ul>

            <footer>
              <div> Product Owner Signature</div>
              <div> Borrower Signature</div>
            </footer>
          </div>
        </>
      )}
    </div>
  );
};

export default RequestDetail;
