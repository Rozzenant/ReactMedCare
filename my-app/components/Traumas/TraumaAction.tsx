import { Button } from 'react-bootstrap';
import axios from "axios";
import {useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store.ts";



// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const TraumaButton = ({ trauma }) => {

  async function handleModeratorEnd(id: number, status: string){
await axios.put(`http://127.0.0.1:8000/trauma/${id}/status_to_end/`,
    { "Status": status },
    {
        withCredentials: true,
        headers: {
            'Authorization': `${user.jwt}`,
            'Content-Type': 'application/json',
        },
    }
)
    .then(response => {
        // console.log("Статус", response.status);
        setButflag(false);
    })
    .catch(error => {
        console.error('Ошибка при выполнении запроса', error);
    });

}

    const [butflag, setButflag] = useState(true)
    const user = useSelector((state: RootState) => state.user);

  return (
    <td style={{ width: "200px" }}>
      {trauma.Status === "Formed" ? (
        butflag ? (
          <>
            <Button className="button-style"
              style={{ "width": "120px", marginBottom: "5px" }}
              onClick={() => handleModeratorEnd(trauma.Trauma_ID, "Completed")}>
              Принять
            </Button>
            <Button className="button-style"
              style={{ "width": "120px" }}
              onClick={() => handleModeratorEnd(trauma.Trauma_ID, "Cancelled")}>
              Отклонить
            </Button>
          </>
        ) : (
          <Button className="button-style"
            disabled={true}
            style={{ "width": "120px" }}>
            Закрыто
          </Button>
        )
      ) : (
        <>
          <Button className="button-style"
            disabled={true}
            style={{ "width": "120px" }}>
            Закрыто
          </Button>
        </>
      )}
    </td>
  );
};

export default TraumaButton;