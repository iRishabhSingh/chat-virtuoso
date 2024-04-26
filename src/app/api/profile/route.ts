import User from "@/model/User";
import dbConnect from "@/lib/dbConnect";

export async function PUT(request: Request) {
  dbConnect();
  const { email, profileImage, alternateEmail } = await request.json();

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return Response.json(
        { success: false, message: "User not found." },
        { status: 404 }
      );
    }

    user.profilePicture = profileImage;
    user.alternateEmail = alternateEmail;

    await user.save();

    return Response.json(
      { success: true, message: "Profile updated successfully." },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { success: false, message: "Error updating profile." },
      { status: 500 }
    );
  }
}
