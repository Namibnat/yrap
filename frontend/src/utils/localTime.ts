const curLocalTime = () => {
  const cur_dateTime = new Date();
  return cur_dateTime.toISOString();
};

export default curLocalTime;
