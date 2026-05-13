export function Footer() {
  return (
    <footer className="footer" id="guide">
      <section className="grade-guide" aria-label="三色分级说明">
        <div>
          <span className="grade-dot green" aria-hidden="true" />
          <strong>日常观察</strong>
          <p>用生活记录和自我管理建立身体意识。</p>
        </div>
        <div>
          <span className="grade-dot yellow" aria-hidden="true" />
          <strong>症状就诊</strong>
          <p>症状持续、加重或影响生活时，咨询对应科室。</p>
        </div>
        <div>
          <span className="grade-dot red" aria-hidden="true" />
          <strong>不盲目做</strong>
          <p>无指征时避免高价、过度或误导性检查。</p>
        </div>
      </section>
      <p className="disclaimer">
        本页面提供健康科普信息，不构成医疗诊断、治疗建议或检查处方。任何检查或治疗决策请遵循专业医师面诊。
      </p>
    </footer>
  )
}
