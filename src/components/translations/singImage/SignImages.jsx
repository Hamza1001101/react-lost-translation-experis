const SignImage = ({ src }) => {
  return (
    <img
      style={{ maxWidth: "100%" }}
      src={"/sign-images/" + src}
      alt={src}
      height="80"
    />
  );
};

export default SignImage;
