import useAuth from "../hooks/useAuth";
import moment from "moment";
const Message = ({ item }) => {
  const { user } = useAuth();

  return (
    <p
      className={`w-fit min-w-6  p-2 px-2 pb-4 relative my-2 text-lg text-right
      rounded-xl rounded-br-none dark:bg-black
     ${item.user === user.email ? "ml-auto bg-blue-300" : "bg-gray-300"} `}
    >
      {item.message}
      <span className="absolute bottom-0.5 right-1.5 text-xs text-gray-500 ">
        {item.timestamp ? moment(item.timestamp.toDate()).format("LT") : "..."}
      </span>
    </p>
  );
};

export default Message;
