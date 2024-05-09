import { useEffect } from "react";
import { getListener, getProfile, initializeMesibo } from "./mesibo.js";

const App = () => {
  const sendMessage = () => {
    const profile = getProfile("test@gmail.com");
    const msg = profile.newMessage();
    msg.message = "Hello message";

    msg.send();
  };

  const getUserProfile = async () => {
    console.log(await getProfile("test@gmail.com").getValues());
  };

  const getMessages = () => {
    const profile = getProfile("test@gmail.com");
    const rs = profile.createReadSession(null, (msg) => console.log(msg));
    rs.enableReadReceipt(true);
    // rs.read(100);

    console.log(rs.read(100));
  };

  useEffect(() => {
    // Mesibo initialization and usage
    initializeMesibo();
  }, []);

  return (
    <div>
      <button type="button" onClick={sendMessage}>
        Send Message
      </button>

      <button type="button" onClick={getUserProfile}>
        Get profile
      </button>

      <button type="button" onClick={getMessages}>
        Get Messages
      </button>
    </div>
  );
};

export default App;
