const ProfileInformation = () => {
  return (
    <>
      <div className="tab-pane active" id="profile">
        <h6>YOUR PROFILE INFORMATION</h6>
        <hr />
        <form>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              className="form-control"
              id="fullName"
              aria-describedby="fullNameHelp"
              placeholder="Enter your fullname"
              defaultValue="Kenneth Valdez"
            />
            <small id="fullNameHelp" className="form-text text-muted">
              Your name may appear around here where you are mentioned. You can
              change or remove it at any time.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="bio">Your Bio</label>
            <textarea
              className="form-control autosize"
              id="bio"
              placeholder="Write something about you"
              style={{
                overflow: "hidden",
                overflowWrap: "break-word",
                resize: "none",
                height: 62,
              }}
              defaultValue={
                "A front-end developer that focus more on user interface design, a web interface wizard, a connector of awesomeness."
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="url">URL</label>
            <input
              type="text"
              className="form-control"
              id="url"
              placeholder="Enter your website address"
              defaultValue="http://benije.ke/pozzivkij"
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              className="form-control"
              id="location"
              placeholder="Enter your location"
              defaultValue="Bay Area, San Francisco, CA"
            />
          </div>
          <div className="form-group small text-muted">
            All of the fields on this page are optional and can be deleted at
            any time, and by filling them out, youre giving us consent to share
            this data wherever your user profile appears.
          </div>
          <button type="button" className="btn btn-primary">
            Update Profile
          </button>
          <button type="reset" className="btn btn-light">
            Reset Changes
          </button>
        </form>
      </div>
    </>
  );
};

export default ProfileInformation;
