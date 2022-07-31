customElements.get("product-form")||customElements.define("product-form",class extends HTMLElement{constructor(){super(),this.form=this.querySelector("form"),this.form.querySelector("[name=id]").disabled=!1,this.form.addEventListener("submit",this.onSubmitHandler.bind(this)),this.cartNotification=document.querySelector("cart-notification")}onSubmitHandler(e){e.preventDefault();const t=this.querySelector('[type="submit"]');if(t.classList.contains("loading"))return;this.handleErrorMessage(),this.cartNotification.setActiveElement(document.activeElement),t.setAttribute("aria-disabled",!0),t.classList.add("loading"),this.querySelector(".loading-overlay__spinner").classList.remove("hidden");const r=fetchConfig("javascript");r.headers["X-Requested-With"]="XMLHttpRequest",delete r.headers["Content-Type"];const s=new FormData(this.form);s.append("sections",this.cartNotification.getSectionsToRender().map((e=>e.id))),s.append("sections_url",window.location.pathname),$("#cus-edi-for-op input").each((function(){var e=$(this).attr("name"),t=$(this).val();s.append(e,t)})),$("#cus-edi-for-op select").each((function(){var e=$(this).attr("name"),t=$(this).val();s.append(e,t)})),$("#cus-edi-for-op textarea").each((function(){var e=$(this).attr("name"),t=$(this).val();s.append(e,t)})),$(".image-radio-checked input").each((function(){var e=$(this).attr("name"),t=$(this).val();s.append(e,t)})),r.body=s,fetch(`${routes.cart_add_url}`,r).then((e=>e.json())).then((e=>{e.status?this.handleErrorMessage(e.description):this.cartNotification.renderContents(e)})).catch((e=>{console.error(e)})).finally((()=>{t.classList.remove("loading"),t.removeAttribute("aria-disabled"),this.querySelector(".loading-overlay__spinner").classList.add("hidden")}))}handleErrorMessage(e=!1){this.errorMessageWrapper=this.errorMessageWrapper||this.querySelector(".product-form__error-message-wrapper"),this.errorMessage=this.errorMessage||this.errorMessageWrapper.querySelector(".product-form__error-message"),this.errorMessageWrapper.toggleAttribute("hidden",!e),e&&(this.errorMessage.textContent=e)}});