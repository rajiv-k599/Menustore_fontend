import jwtDecode from "jwt-decode";

const withAdminAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const accessToken = localStorage.getItem("token") ?? "";
    if (accessToken) {
      const decode: {
        role: string;
      } = jwtDecode(accessToken);
    }
    if (!accessToken) {
      window.location.replace("/login");
      return null;
    }
    return <WrappedComponent {...props} />;
  };
};
export default withAdminAuth;
