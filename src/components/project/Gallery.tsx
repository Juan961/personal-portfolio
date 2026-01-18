export default function Gallery() {
  return (
    <div className="mb-16">
      <h3 className="mb-6 text-xl font-bold uppercase tracking-tight text-white">Interface Gallery</h3>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="group relative aspect-4/3 cursor-pointer overflow-hidden rounded-lg bg-surface-dark">
          <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" data-alt="Mobile responsive view of the dashboard on a smartphone" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBxLzUzHApZNkm_zj85pvvzSBVZNKeTyEEwASOtc94JRVcebZB5WmmobM0Otn4EGgdgvBqgweu2lxjcv7CMT73p77CWiLiXSF8nDJFSbgEIEzps26RlaiT2bdzeM4gL7yvKdyfll_umaKrfMQwIy3gY43s4STkrbmNH1VBy3vh1TxhL3pmpqsCICQ1W-wf5lzkqnbP26QtYFCkd44n2gOHExORWYyYrQONHnR6NCtniQAwXT4voOU7DAnIpuJXx2D_4MqkL0mcnBTo")' }}>
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
            <span className="material-symbols-outlined text-white text-3xl">zoom_in</span>
          </div>
        </div>
        <div className="group relative aspect-4/3 cursor-pointer overflow-hidden rounded-lg bg-surface-dark">
          <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" data-alt="Detailed view of the analytics settings panel" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAaAF5pZVwCInIcPi54SYh9hmmWlkHEDrWmcUf-7kVQtxowJdbRRbg9MyrvacaarvkiqT4bYZhkrqDpdO6c_mtan0fcj05WDyGMR83pg7w_XOGxxiEglTxBqIT5q0HbO5H_QclCmhXFg6RX0sRU_T-UTayu5uRtLNAqu_KSA2yfJ6oWt58iyW_LdvioTXdwukCDhuxa8LLktv6MMsYOr_bPratDKhrwZTMNGcy-Q6wMpehOMgwj6uSj8WK80ARaliIkdWpyHgv7VYM")' }}>
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
            <span className="material-symbols-outlined text-white text-3xl">zoom_in</span>
          </div>
        </div>
        <div className="group relative aspect-4/3 cursor-pointer overflow-hidden rounded-lg bg-surface-dark">
          <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" data-alt="Dark mode toggle interaction demonstration" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB8GNXs28p3q46Gs6gfS05BC2UZpMUMoU8_0v1WOGk8i3K-7-FxvlfOJ4VeV96r5FIR9hoOlv2mLMfv2ZQ0_Fkh73t6e5RljTO26JEtzUR070TqPQ-timvdKWKJDWL9ViHkU94B1MYrHhrx4yaWloBdJfCAzNjLwhYs02VCvizSddtV4PE8JO6J1TFfnxo7au2NRHNsoUcrxmjOHpcaeRCl1H8UIV5PlguY4EyL472QZqEWVEbVrusYTKARBkcVsEiBbbJkAzI91UY")' }}>
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
            <span className="material-symbols-outlined text-white text-3xl">zoom_in</span>
          </div>
        </div>
      </div>
    </div>
  )
}
