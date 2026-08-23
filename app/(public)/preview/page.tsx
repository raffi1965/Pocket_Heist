// preview page for newly created UI components
import Skeleton from "@/components/Skeleton"
import Avatar from "@/components/Avatar"

export default function PreviewPage() {
  return (
    <div className="page-content">
      <h2>Preview</h2>

      <section>
        <h3>Avatar Component</h3>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "2rem" }}>
          <Avatar name="Alice" />
          <Avatar name="JohnDoe" />
          <Avatar name="JohnDoeSmithBrownGreenWhiteBlackGrayBlue" />
        </div>
      </section>

      <section>
        <h3>Skeleton Component</h3>
        <div className="preview-grid">
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      </section>
    </div>
  )
}
