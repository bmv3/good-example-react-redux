import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import {
  removeCustomerAction,
  addCustomerAction
} from "./store/customerReducer";

import { fetchCustomers } from "./asyncActions/customers";

import { addCashAction, getCashAction } from "./store/cashReducer";

export default function App() {
  const dispatch = useDispatch();

  const cash = useSelector((state) => state.cash.cash);
  const customers = useSelector((state) => state.customers.customers);

  const addCash = (cash) => {
    dispatch(addCashAction(cash));
  };

  const getCash = (cash) => {
    dispatch(getCashAction(cash));
  };

  const addCustomer = (name) => {
    const customer = {
      name,
      id: Date.now()
    };
    dispatch(addCustomerAction(customer));
  };

  const removeCustomer = (customer) => {
    dispatch(removeCustomerAction(customer.id));
  };

  return (
    <div className="App">
      <div style={{ fontSize: "3em" }}>Баланс: {cash}</div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={() => addCash(Number(prompt()))}>
          Пополнить счет
        </button>
        <button onClick={() => getCash(Number(prompt()))}>
          Снять со счета
        </button>
        <button onClick={() => addCustomer(prompt())}>Добавить клиента</button>
        <button onClick={() => getCash(Number(prompt()))}>
          Удалить клиента
        </button>
        <button onClick={() => dispatch(fetchCustomers())}>
          Добавить много клиентов
        </button>
      </div>
      {customers.length > 0 ? (
        <div style={{ fontSize: "1.5em" }}>
          {customers.map((customer) => (
            <div
              onClick={() => removeCustomer(customer)}
              style={{
                width: "50%",
                border: "1px solid black",
                margin: "10px auto"
              }}
              key={customer.id}
            >
              {customer.name}
            </div>
          ))}
        </div>
      ) : (
        <div style={{ fontSize: "1.5em" }}>Клиенты отсутствуют</div>
      )}
    </div>
  );
}
