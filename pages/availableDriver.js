import styles from '/styles/availableDriver.module.css'

export const getStaticProps = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await res.json();

  return {
    props: { drivers: data }
  }
}

const Drivers = ({ drivers }) => {
    // console.log(drivers)
  
    return (
      <div>
        <h1>All drivers</h1>
        {drivers.map(driver => (
          <div key={driver.id}>
            <a className={styles.single}>
              <h3>{ driver.name }</h3>
            </a>
          </div>
        ))}
      </div>
    );
  } 
export default Drivers;

