import { useEffect } from "react";
import MesiboListener from "./mesibo.js";

const App = () => {
  const mesibo = new MesiboListener();

  useEffect(() => {
    mesibo.afterScriptLoads();
  }, []);

  // const sendMessage = () => {
  //   const profile = getProfile("test@gmail.com");
  //   const msg = profile.newMessage();
  //   msg.message = "Hello message";

  //   msg.send();
  // };

  // const getUserProfile = async () => {
  //   console.log(await getProfile("test@gmail.com").getValues());
  // };

  // useEffect(() => {
  //   // Mesibo initialization and usage
  //   initializeMesibo();
  // }, []);

  return (
    <div>
      <button type="button" onClick={mesibo.sendMessage}>
        Send Message
      </button>

      {/* <button type="button" onClick={getUserProfile}>
        Get profile
      </button> */}

      <button type="button" onClick={mesibo.getMessages}>
        Get Messages
      </button>
    </div>
  );
};

export default App;
