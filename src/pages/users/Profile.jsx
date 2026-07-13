import React from "react";
import { User, Mail, Phone, Pencil } from "lucide-react";

const UserProfileCard = ({ user, onEdit }) => {
  return (
    <div className="card border-0 shadow-sm rounded-4">
      <div className="card-body p-4">

        <div className="d-flex align-items-center">

          {/* Avatar */}
          <div
            className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold me-4"
            style={{
              width: "80px",
              height: "80px",
              fontSize: "28px"
            }}
          >
            {user?.name?.charAt(0)?.toUpperCase() || <User size={32} />}
          </div>

          {/* User Info */}
          <div className="flex-grow-1">

            <h4 className="fw-bold mb-1">
              {user?.name}
            </h4>

            <div className="text-muted d-flex align-items-center mb-2">
              <Mail size={16} className="me-2" />
              {user?.email || "Not provided"}
            </div>

            <div className="text-muted d-flex align-items-center">
              <Phone size={16} className="me-2" />
              {user?.phone}
            </div>

          </div>

          {/* Edit Button */}
          <button
            className="btn btn-outline-primary rounded-pill px-4"
            onClick={onEdit}
          >
            <Pencil size={16} className="me-2" />
            Edit Profile
          </button>

        </div>

      </div>
    </div>
  );
};

export default UserProfileCard;