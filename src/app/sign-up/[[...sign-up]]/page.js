import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div style={{ padding: 40 }}>
      <SignUp routing="path" path="/sign-up" />
    </div>
  );
}
