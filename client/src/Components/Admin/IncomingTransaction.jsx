import { Container, Table } from "react-bootstrap";

const IncomingTransaction = () => {
  // cek data
  // const [currentPage, setCurrentPage] = useState(1);

  // const [activePage, setActivePage] = useState(1);

  // // let tryData = async () => {
  // //   try {
  // //     let {data} = useCustomQuery("transaction", TransactionList)
  // //   } catch (error) {

  // //   }
  // // }
  // const { data, isLoading, isError, error } = useCustomQuery(
  //   "transaction",
  //   transactionList,
  // );

  // // ...

  // if (isLoading) {
  //   return <div>Loading...</div>; // Tampilkan loading state selama data sedang dimuat
  // }
  // if (isError) {
  //   return <div>Error: {error.message}</div>; // Tampilkan pesan error jika terjadi kesalahan
  // }

  // const recordperPage = 10;
  // const lastIndex = currentPage * recordperPage;
  // const firstIndex = lastIndex - recordperPage;
  // const record = data?.slice(firstIndex, lastIndex);
  // // urutkan abjad
  // data.sort((a, b) => {
  //   const nameA = a.user.fullname.toLowerCase();
  //   const nameB = b.user.fullname.toLowerCase();
  //   if (nameA < nameB) {
  //     return -1;
  //   }
  //   if (nameA > nameB) {
  //     return 1;
  //   }
  //   return 0;
  // });
  // const npage = Math.ceil(data.length / recordperPage);

  // const number = [...Array(npage + 1).keys()].slice(1);

  // console.log(data, "ini datas dari iTransaction");

  // const nextPage = () => {
  //   if (currentPage !== lastIndex) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // };
  // const changePage = (id) => {
  //   setCurrentPage(id);
  //   setActivePage(id);
  // };
  // const prePage = () => {
  //   if (currentPage !== firstIndex) {
  //     setCurrentPage(currentPage - 1);
  //   }
  // };

  return (
    <>
      <Container>
        <h3 className="mt-5">Incoming Transaction</h3>
        <Table striped className="mt-5" style={{ border: "1px solid #000" }}>
          <thead>
            <tr className="mt-3">
              <th>ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Product Order</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>


            <tr className="mt-5" >
              <td>id</td>
              <td>Name</td>
              <td>Address</td>

              <td>
                <p>test</p>
              </td>
              <td >
                <p>pending</p>
              </td>
            </tr>


          </tbody>
        </Table>
        {/* <nav>
          <ul
            style={{ display: "flex", justifyContent: "center" }}
            className="listAdmin"
          >
            <li className="preStyle me-3">
              <a onClick={() => prePage()} className="">
                Prev
              </a>
            </li>
            {number?.map((n, i) => (
              <li key={i}>
                <a onClick={() => changePage(n)}>{n}</a>
              </li>
            ))}
            <li className="nextStyle ms-3">
              <a onClick={() => nextPage()}>Next</a>
            </li>
          </ul>
        </nav> */}
      </Container>
    </>
  );
};

export default IncomingTransaction;
