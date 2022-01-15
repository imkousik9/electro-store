import { useAuthentication } from '../authenticationSlice';

function Profile() {
  const auth = useAuthentication();

  return (
    <>
      <h1 className="font-semibold">Profile Details</h1>
      <div className="flex mt-10 space-x-20">
        <div className="space-y-4">
          <p>Full Name</p>
          <p>Email ID</p>
        </div>
        <div className="space-y-4">
          <p>
            {auth?.user?.firstName} {auth?.user?.lastName}
          </p>
          <p>{auth?.user?.email}</p>
        </div>
      </div>
    </>
  );
}

export default Profile;
