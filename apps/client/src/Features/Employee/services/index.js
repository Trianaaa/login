export const getEmployee = async (setData) => {
  try {
    const res = await fetch("http://localhost:3002/employee");
    const data = await res.json();
    setData(data);
  } catch (err) {
    console.error(err);
  }
};

export const updateEmployee = async (employee, setData) => {
  try {
    await fetch(`http://localhost:3002/employee/${employee._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employee),
    });
    getEmployee(setData);
  } catch (err) {
    console.error(err);
  }
};

export const deleteEmployee = (employeeId, setData) => async () => {
  try {
    await fetch(`http://localhost:3002/employee/${employeeId}`, {
      method: "DELETE",
    });
    getEmployee(setData);
  } catch (err) {
    console.error(err);
  }
};
