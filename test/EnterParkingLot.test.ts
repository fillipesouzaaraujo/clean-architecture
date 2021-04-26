import EnterParkingLot from '../src/core/usecase/EnterParkingLot';
import GetParkingLot from '../src/core/usecase/GetParkingLot';
import ParkingLotRepositoryMemory from '../src/infra/repository/ParkingLotRepositoryMemory';
import ParkingLotRepositorySQL from '../src/infra/repository/ParkingLotRepositorySQL';

test.skip("Sould get parking lot", async function () {
  const parkingLotRepositoryMemory = new ParkingLotRepositoryMemory();
  const parkingLotRepositorySQL = new ParkingLotRepositorySQL();
  const getParkingLot = new GetParkingLot(parkingLotRepositorySQL);
  const parkingLot = await getParkingLot.execute("shopping");
  expect(parkingLot.code).toBe("shopping");
});

test("Sould enter parking lot", async function () {
  const parkingLotRepositoryMemory = new ParkingLotRepositoryMemory();
  const parkingLotRepositorySQL = new ParkingLotRepositorySQL();
  const enterParkingLot = new EnterParkingLot(parkingLotRepositorySQL);
  const getParkingLot = new GetParkingLot(parkingLotRepositorySQL);
  const parkingLotBeforeEnter = await getParkingLot.execute("shopping");
  expect(parkingLotBeforeEnter.occupiedSpaces).toBe(0);
  await enterParkingLot.execute("shopping", "MMM-0001", new Date("2021-04-01T10:00:00"));
  const parkingLotAfterEnter = await getParkingLot.execute("shopping");
  expect(parkingLotAfterEnter.occupiedSpaces).toBe(1);
});

test.skip("Sould be closed", async function () {
  const parkingLotRepositoryMemory = new ParkingLotRepositoryMemory();
  const enterParkingLot = new EnterParkingLot(parkingLotRepositoryMemory);
  const getParkingLot = new GetParkingLot(parkingLotRepositoryMemory);
  const parkingLotBeforeEnter = await getParkingLot.execute("shopping");
  expect(parkingLotBeforeEnter.occupiedSpaces).toBe(0);
  await enterParkingLot.execute("shopping", "MMM-0001", new Date("2021-04-01T23:00:00"));
});

test.skip("Sould be full", async function () {
  const parkingLotRepositoryMemory = new ParkingLotRepositoryMemory();
  const enterParkingLot = new EnterParkingLot(parkingLotRepositoryMemory);
  const getParkingLot = new GetParkingLot(parkingLotRepositoryMemory);
  const parkingLotBeforeEnter = await getParkingLot.execute("shopping");
  expect(parkingLotBeforeEnter.occupiedSpaces).toBe(0);
  await enterParkingLot.execute("shopping", "MMM-0001", new Date("2021-04-01T21:00:00"));
  await enterParkingLot.execute("shopping", "MMM-0001", new Date("2021-04-01T21:00:00"));
  await enterParkingLot.execute("shopping", "MMM-0001", new Date("2021-04-01T21:00:00"));
  await enterParkingLot.execute("shopping", "MMM-0001", new Date("2021-04-01T21:00:00"));
  await enterParkingLot.execute("shopping", "MMM-0001", new Date("2021-04-01T21:00:00"));
  await enterParkingLot.execute("shopping", "MMM-0001", new Date("2021-04-01T21:00:00"));
});