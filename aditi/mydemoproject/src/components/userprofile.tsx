import { useAppSelector } from "../store/slice/hooks";
const UserProfile = () => {

    const data = useAppSelector((state) => state.api.data);

    return (
        <>
        <div className="offerMain">
          <div className="offerContainer">
            <p className="Ptag">
              User Profile
            </p>
            <div className="offerField">
                  <div className="offer-box" >
                    <div className="row row-col-2">
                      <div className="col-4 ">
                        <img className="d-flex "src="/images/profile1.png" alt="userimage" width={200} height={200} />
                      </div>
                      <div className="col-8 mt-3">
                        <b>User Name : </b><span>{data.username}</span><br></br>
                        <b>Email Id  : </b><span>{data.email}</span>
                      </div>
                    </div>
                  </div>
            </div>
          </div>
        </div>
        </>
    )
}

export default UserProfile;