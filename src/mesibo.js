let api;
let isMesiboinitialized = false;

class MesiboListener {
  Mesibo_OnConnectionStatus(status, value) {
    if (status === MESIBO_STATUS_ONLINE) {
      // store.dispatch(initializeMesiboInRedux());
      console.log("mesibo online", status);
    }
    console.log("Connection status", status, value);
  }

  Mesibo_OnMessage(msg, data) {
    // store.dispatch(updateTimeStamp());
    console.log("Msg received", msg, data);
  }

  Mesibo_onMessageStatus(msg) {
    var sender = msg.profile;
    console.log(
      "Mesibo_onMessageStatus: from " +
        sender.getNameOrAddress("") +
        " status: " +
        msg.getStatus() +
        " id: " +
        msg.mid
    );
  }

  Mesibo_onMessage = function (msg) {
    /* Messaging documentation https://mesibo.com/documentation/api/messaging/ */
    if (msg.isIncoming()) {
      /* Profile documentation https://mesibo.com/documentation/api/users-and-profiles/ */
      var sender = msg.profile;

      // check if this message belongs to a group
      /* Group Management - https://mesibo.com/documentation/api/group-management/ */
      // if (msg.isGroupMessage()) {
      //   var group = msg.groupProfile;
      // }

      // check if this message is realtime or read from the database
      if (msg.isRealtimeMessage()) {
        console.log(
          "Mesibo_onMessage: from " +
            sender.getNameOrAddress("") +
            " msg: " +
            msg.message
        );
      }
    }
  };
}
const afterScriptLoads = async () => {
  api = new Mesibo();
  api.setAccessToken(
    "3ea983703a784ac352dbc2b1da0e2f544ec893a8385585c34ecc4b515bla162a94ac03"
  );
  api.setListener(new MesiboListener());
  await api.setDatabase("mesibo.db");
  api.setAppName("testing.mesibo");
  api.start();
  window.api = api;
};

const initializeMesibo = () => {
  if (isMesiboinitialized) {
    return;
  } else {
    afterScriptLoads();
    isMesiboinitialized = true;
  }
};

const getMesiboApi = () => {
  return api;
};

const getListener = () => {
  return new MesiboListener();
};

const getProfile = (userId) => {
  return api.getProfile(userId);
};

export { getMesiboApi, initializeMesibo, getProfile, getListener };
