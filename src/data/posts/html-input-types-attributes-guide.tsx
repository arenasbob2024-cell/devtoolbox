'use client';
import React from 'react';
import Link from 'next/link';

const translations: Record<string, Record<string, string>> = {
  en: {
    intro: 'HTML input elements are the backbone of web forms. With over 20 input types and dozens of attributes, understanding how to use them correctly is critical for building accessible, user-friendly, and mobile-optimized forms. This <strong>complete HTML input types and attributes guide</strong> covers every input type, validation attribute, accessibility best practice, and mobile optimization technique you need.',
    link_tool: 'Build HTML tables for your forms with our HTML Table Generator \u2192',

    h2_text: '1. Text Input Types',
    p_text: 'Text-based inputs are the most common form elements. HTML5 introduced several specialized text types that provide built-in validation and trigger appropriate mobile keyboards.',
    h3_text_basic: 'Basic Text Input',
    p_text_basic: 'The <code>text</code> type is the default and most versatile input. It accepts any string value and is suitable for names, addresses, and general free-form text.',
    h3_password: 'Password Input',
    p_password: 'The <code>password</code> type masks user input with dots or asterisks. Browsers may offer to save passwords and autofill them on subsequent visits.',
    h3_email: 'Email Input',
    p_email: 'The <code>email</code> type provides built-in email format validation. On mobile devices, it triggers a keyboard with the <code>@</code> symbol readily accessible.',
    h3_tel: 'Telephone Input',
    p_tel: 'The <code>tel</code> type does not enforce any specific format (phone number formats vary by country), but it triggers the numeric phone keypad on mobile devices.',
    h3_url: 'URL Input',
    p_url: 'The <code>url</code> type validates that the input contains a valid URL format. On mobile, it typically shows a keyboard with <code>/</code> and <code>.com</code> keys.',
    h3_search: 'Search Input',
    p_search: 'The <code>search</code> type behaves like a text input but may be styled differently by the browser (e.g., with a clear button) and pairs with the <code>search</code> ARIA role.',

    h2_number: '2. Number & Range Inputs',
    p_number: 'Numeric inputs restrict user input to numbers and provide spinner controls. The <code>range</code> type offers a slider interface for selecting values within a defined range.',
    h3_number_input: 'Number Input',
    p_number_input: 'The <code>number</code> type shows spinner arrows for incrementing/decrementing. Use <code>min</code>, <code>max</code>, and <code>step</code> attributes to control the allowed range and increment.',
    h3_range: 'Range Input (Slider)',
    p_range: 'The <code>range</code> type renders a slider control. Unlike <code>number</code>, it does not show the exact value by default \u2014 you need JavaScript or an <code>&lt;output&gt;</code> element to display it.',

    h2_date: '3. Date & Time Inputs',
    p_date: 'HTML5 date and time inputs provide native date pickers without requiring a JavaScript library. Browser support is now excellent across modern browsers.',
    h3_date_input: 'Date Input',
    p_date_input: 'The <code>date</code> type presents a date picker UI. The value is always formatted as <code>YYYY-MM-DD</code> regardless of the displayed format.',
    h3_time: 'Time Input',
    p_time: 'The <code>time</code> type allows selecting a time of day. The value is in 24-hour <code>HH:MM</code> format, though the display may show AM/PM based on locale.',
    h3_datetime_local: 'DateTime-Local Input',
    p_datetime_local: 'The <code>datetime-local</code> type combines date and time selection into a single input. Note: The deprecated <code>datetime</code> type should no longer be used.',
    h3_month: 'Month Input',
    p_month: 'The <code>month</code> type allows selecting a year and month combination. Useful for credit card expiration dates or monthly reports.',
    h3_week: 'Week Input',
    p_week: 'The <code>week</code> type allows selecting a specific week of a year. The value format is <code>YYYY-Wnn</code> (e.g., <code>2025-W03</code>).',

    h2_selection: '4. Selection Inputs',
    p_selection: 'Selection inputs let users choose from predefined options. These include checkboxes, radio buttons, dropdown selects, and the modern datalist element.',
    h3_checkbox: 'Checkbox',
    p_checkbox: 'Checkboxes allow users to select zero or more options from a set. Each checkbox operates independently. Use the <code>checked</code> attribute for default selection.',
    h3_radio: 'Radio Buttons',
    p_radio: 'Radio buttons let users select exactly one option from a group. All radio buttons in a group must share the same <code>name</code> attribute.',
    h3_select: 'Select Dropdown',
    p_select: 'The <code>&lt;select&gt;</code> element creates a dropdown menu. While not an <code>&lt;input&gt;</code>, it is essential for form selection. Use <code>multiple</code> for multi-select.',
    h3_datalist: 'Datalist (Autocomplete)',
    p_datalist: 'The <code>&lt;datalist&gt;</code> element provides autocomplete suggestions for an <code>&lt;input&gt;</code>. Users can type freely or choose from the suggestions.',

    h2_file: '5. File & Media Inputs',
    p_file: 'File inputs allow users to upload files from their device. The <code>hidden</code> and <code>image</code> types serve special purposes in form handling.',
    h3_file_input: 'File Upload',
    p_file_input: 'The <code>file</code> type opens a file picker dialog. Use <code>accept</code> to restrict file types and <code>multiple</code> to allow multi-file selection.',
    h3_image: 'Image Submit Button',
    p_image: 'The <code>image</code> type creates a graphical submit button. When clicked, the form submits along with the x/y coordinates of the click position.',
    h3_hidden: 'Hidden Input',
    p_hidden: 'The <code>hidden</code> type stores data that is submitted with the form but not visible to the user. Commonly used for CSRF tokens, IDs, and tracking data.',

    h2_button: '6. Button Types',
    p_button: 'Understanding the differences between button types is crucial for correct form behavior. Using the wrong type can cause unexpected form submissions.',
    h3_submit: 'Submit Button',
    p_submit: 'The <code>submit</code> type triggers form submission. This is the default behavior of <code>&lt;button&gt;</code> elements inside a form.',
    h3_reset: 'Reset Button',
    p_reset: 'The <code>reset</code> type restores all form controls to their initial values. Use sparingly \u2014 users rarely want this functionality and may click it by accident.',
    h3_button: 'Generic Button',
    p_button_generic: 'The <code>button</code> type has no default behavior. Use it for JavaScript-driven actions that should not submit or reset the form.',

    h2_validation: '7. Validation Attributes',
    p_validation: 'HTML5 provides powerful built-in validation that reduces the need for JavaScript. These attributes work with the <strong>Constraint Validation API</strong> to provide immediate feedback.',
    h3_required: 'required',
    p_required: 'The <code>required</code> attribute prevents form submission if the field is empty. It works with text, email, password, file, checkbox, radio, select, and more.',
    h3_pattern: 'pattern',
    p_pattern: 'The <code>pattern</code> attribute specifies a regular expression that the input value must match. Always provide a <code>title</code> attribute explaining the expected format.',
    h3_minmax_length: 'minlength & maxlength',
    p_minmax_length: 'These attributes restrict the number of characters a user can enter. <code>maxlength</code> physically prevents typing beyond the limit; <code>minlength</code> triggers validation on submission.',
    h3_minmax: 'min & max',
    p_minmax: 'The <code>min</code> and <code>max</code> attributes set boundaries for numeric and date inputs. Values outside this range will fail validation.',

    h2_styling: '8. Styling & UX Attributes',
    p_styling: 'These attributes enhance user experience by providing hints, controlling autofill behavior, and guiding focus.',
    h3_placeholder: 'placeholder',
    p_placeholder: 'The <code>placeholder</code> attribute shows hint text inside the input. It disappears when the user starts typing. <strong>Never use placeholder as a substitute for a label</strong> \u2014 it is not accessible and disappears on input.',
    h3_autofocus: 'autofocus',
    p_autofocus: 'The <code>autofocus</code> attribute automatically focuses the input when the page loads. Only one element per page should have this attribute. Use sparingly as it can be disorienting for screen reader users.',
    h3_autocomplete: 'autocomplete',
    p_autocomplete: 'The <code>autocomplete</code> attribute hints to the browser what kind of data is expected, enabling smart autofill. Values include <code>name</code>, <code>email</code>, <code>tel</code>, <code>address-line1</code>, <code>cc-number</code>, and many more.',
    h3_inputmode: 'inputmode',
    p_inputmode: 'The <code>inputmode</code> attribute controls which virtual keyboard is displayed on mobile devices without changing the input type or validation behavior.',

    h2_accessibility: '9. Accessibility Best Practices',
    p_accessibility: 'Accessible forms ensure all users, including those using screen readers and assistive technology, can interact with your inputs. Accessibility is not optional \u2014 it is a legal requirement in many jurisdictions.',
    h3_label: 'Labels',
    p_label: 'Every input must have an associated <code>&lt;label&gt;</code>. Use the <code>for</code> attribute matching the input\'s <code>id</code>, or wrap the input inside the label element.',
    h3_aria: 'ARIA Attributes',
    p_aria: 'ARIA attributes provide additional context to assistive technologies. Use <code>aria-describedby</code> for help text, <code>aria-invalid</code> for error states, and <code>aria-required</code> as a supplement to the native <code>required</code> attribute.',
    h3_fieldset: 'Fieldset & Legend',
    p_fieldset: 'Group related inputs with <code>&lt;fieldset&gt;</code> and provide a group label with <code>&lt;legend&gt;</code>. This is especially important for radio button and checkbox groups.',
    h3_errors: 'Error Messages',
    p_errors: 'Display error messages near the input they relate to. Use <code>aria-describedby</code> to associate the error with the input, and <code>aria-live="polite"</code> to announce errors to screen readers.',

    h2_mobile: '10. Mobile Keyboard Optimization',
    p_mobile: 'The <code>inputmode</code> attribute gives you fine-grained control over mobile virtual keyboards without changing the input type. This is particularly useful when you need a specific keyboard but want to maintain <code>type="text"</code> for custom validation.',
    h3_numeric: 'Numeric Keyboard',
    p_numeric: 'Use <code>inputmode="numeric"</code> for fields that expect numbers but do not need <code>type="number"</code> behavior (like PIN codes, ZIP codes, or credit card numbers).',
    h3_email_kb: 'Email Keyboard',
    p_email_kb: 'Use <code>inputmode="email"</code> to show an email-optimized keyboard with <code>@</code> and <code>.</code> keys prominently displayed.',
    h3_tel_kb: 'Telephone Keyboard',
    p_tel_kb: 'Use <code>inputmode="tel"</code> to display the full telephone keypad, ideal for phone number entry.',
    h3_url_kb: 'URL Keyboard',
    p_url_kb: 'Use <code>inputmode="url"</code> to display a keyboard with <code>/</code>, <code>.</code>, and <code>.com</code> keys for URL entry.',
    h3_decimal: 'Decimal Keyboard',
    p_decimal: 'Use <code>inputmode="decimal"</code> for numeric fields that may include a decimal point, like prices or measurements.',

    h2_formdata: '11. Form Submission & FormData API',
    p_formdata: 'Modern JavaScript provides the <strong>FormData API</strong> for programmatic form handling. Combined with the <code>fetch</code> API, you can submit forms without page reloads.',
    h3_formdata_basic: 'Basic FormData Usage',
    p_formdata_basic: 'The <code>FormData</code> constructor accepts a form element and automatically collects all named input values.',
    h3_fetch: 'Fetch API with Forms',
    p_fetch: 'Use <code>fetch()</code> to submit form data asynchronously. The browser automatically sets the correct <code>Content-Type</code> header when you pass a <code>FormData</code> object.',
    h3_encoding: 'Encoding Types (enctype)',
    p_encoding: 'The <code>enctype</code> attribute on <code>&lt;form&gt;</code> controls how form data is encoded before sending. The three options are:',
    encoding_urlencoded: '<code>application/x-www-form-urlencoded</code> \u2014 Default. Key-value pairs separated by <code>&amp;</code>. Suitable for most text-only forms.',
    encoding_multipart: '<code>multipart/form-data</code> \u2014 Required for file uploads. Each field is sent as a separate part with boundary markers.',
    encoding_text: '<code>text/plain</code> \u2014 Sends data as plain text. Rarely used; not recommended for production.',

    h2_comparison: '12. Input Types Comparison Table',
    p_comparison: 'The following table summarizes all HTML input types, their primary use cases, mobile keyboard behavior, and browser support status.',
    th_type: 'Type',
    th_use_case: 'Use Case',
    th_mobile_kb: 'Mobile Keyboard',
    th_validation: 'Built-in Validation',
    th_support: 'Browser Support',

    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'What is the difference between type="button" and type="submit"?',
    faq1_a: '<code>type="submit"</code> triggers form submission and validation when clicked. <code>type="button"</code> has no default behavior \u2014 it requires JavaScript to perform any action. Inside a <code>&lt;form&gt;</code>, a <code>&lt;button&gt;</code> without an explicit type defaults to <code>submit</code>, which can cause accidental form submissions. Always set <code>type="button"</code> for non-submit buttons.',
    faq2_q: 'Should I use type="number" or inputmode="numeric" for credit card fields?',
    faq2_a: 'Use <code>type="text"</code> with <code>inputmode="numeric"</code> for credit card numbers. <code>type="number"</code> adds spinner arrows, allows scientific notation (e.g., <code>1e2</code>), and may strip leading zeros \u2014 all undesirable for card numbers. The <code>inputmode</code> attribute gives you the numeric keyboard without these side effects.',
    faq3_q: 'How do I make a date input required and set min/max dates?',
    faq3_a: 'Add the <code>required</code> attribute along with <code>min</code> and <code>max</code> attributes in <code>YYYY-MM-DD</code> format: <code>&lt;input type="date" required min="2024-01-01" max="2025-12-31"&gt;</code>. The browser will prevent submission if the field is empty or the date is outside the allowed range.',
    faq4_q: 'What is the best way to handle file upload size limits in HTML?',
    faq4_a: 'HTML alone cannot enforce file size limits. The <code>accept</code> attribute restricts file types (e.g., <code>accept=".pdf,.docx"</code> or <code>accept="image/*"</code>), but size validation must be done with JavaScript using <code>input.files[0].size</code> on the <code>change</code> event, or on the server side. Always validate on the server regardless of client-side checks.',
    faq5_q: 'How do I style the native HTML validation error messages?',
    faq5_a: 'You cannot directly style native browser validation tooltips. However, you can use the <code>:invalid</code>, <code>:valid</code>, <code>:required</code>, and <code>:user-invalid</code> CSS pseudo-classes to style the inputs themselves. For fully custom error messages, use the Constraint Validation API: call <code>input.setCustomValidity("message")</code> and use <code>input.reportValidity()</code>. Alternatively, suppress native popups with <code>novalidate</code> on the form and implement custom validation UI entirely in JavaScript.',

    conclusion: 'Bookmark this page as your reference for HTML input types and attributes. For building HTML-based forms and tables, try our tools below.',
    link_table: 'Create HTML tables with our HTML Table Generator \u2192',
    link_meta: 'Generate meta tags with our Meta Tag Generator \u2192',
  },
  zh: {
    intro: 'HTML 输入元素是 Web 表单的基础。HTML 拥有超过 20 种输入类型和数十个属性，正确理解和使用它们对于构建无障碍、用户友好且移动端优化的表单至关重要。本<strong>HTML 输入类型与属性完整指南</strong>涵盖所有输入类型、验证属性、无障碍最佳实践和移动端优化技巧。',
    link_tool: '使用我们的 HTML 表格生成器为表单构建表格 \u2192',

    h2_text: '1. 文本输入类型',
    p_text: '基于文本的输入是最常见的表单元素。HTML5 引入了多种专用文本类型，提供内置验证并触发适当的移动端键盘。',
    h3_text_basic: '基础文本输入',
    p_text_basic: '<code>text</code> 类型是默认且最通用的输入。它接受任何字符串值，适用于姓名、地址和一般自由文本。',
    h3_password: '密码输入',
    p_password: '<code>password</code> 类型用点或星号掩盖用户输入。浏览器可能会提供保存密码并在后续访问时自动填充。',
    h3_email: '电子邮件输入',
    p_email: '<code>email</code> 类型提供内置的电子邮件格式验证。在移动设备上，它会触发带有 <code>@</code> 符号的键盘。',
    h3_tel: '电话输入',
    p_tel: '<code>tel</code> 类型不强制任何特定格式（各国电话号码格式不同），但在移动设备上会触发数字电话键盘。',
    h3_url: 'URL 输入',
    p_url: '<code>url</code> 类型验证输入是否包含有效的 URL 格式。在移动端，它通常显示带有 <code>/</code> 和 <code>.com</code> 按键的键盘。',
    h3_search: '搜索输入',
    p_search: '<code>search</code> 类型的行为类似文本输入，但浏览器可能会以不同方式呈现（如带有清除按钮），并与 <code>search</code> ARIA 角色配合使用。',

    h2_number: '2. 数字与范围输入',
    p_number: '数字输入将用户输入限制为数字并提供微调器控件。<code>range</code> 类型提供滑块界面，用于在定义范围内选择值。',
    h3_number_input: '数字输入',
    p_number_input: '<code>number</code> 类型显示用于递增/递减的微调箭头。使用 <code>min</code>、<code>max</code> 和 <code>step</code> 属性来控制允许的范围和步进值。',
    h3_range: '范围输入（滑块）',
    p_range: '<code>range</code> 类型渲染为滑块控件。与 <code>number</code> 不同，它默认不显示确切值 \u2014 你需要使用 JavaScript 或 <code>&lt;output&gt;</code> 元素来显示它。',

    h2_date: '3. 日期与时间输入',
    p_date: 'HTML5 日期和时间输入提供原生日期选择器，无需 JavaScript 库。现代浏览器的支持已经非常好。',
    h3_date_input: '日期输入',
    p_date_input: '<code>date</code> 类型呈现日期选择器界面。无论显示格式如何，值始终格式化为 <code>YYYY-MM-DD</code>。',
    h3_time: '时间输入',
    p_time: '<code>time</code> 类型允许选择一天中的时间。值为 24 小时制 <code>HH:MM</code> 格式，但显示可能根据语言环境显示 AM/PM。',
    h3_datetime_local: '日期时间本地输入',
    p_datetime_local: '<code>datetime-local</code> 类型将日期和时间选择合并到单个输入中。注意：已弃用的 <code>datetime</code> 类型不应再使用。',
    h3_month: '月份输入',
    p_month: '<code>month</code> 类型允许选择年份和月份的组合。适用于信用卡有效期或月度报告。',
    h3_week: '周输入',
    p_week: '<code>week</code> 类型允许选择一年中的特定周。值格式为 <code>YYYY-Wnn</code>（如 <code>2025-W03</code>）。',

    h2_selection: '4. 选择输入',
    p_selection: '选择输入让用户从预定义选项中进行选择。包括复选框、单选按钮、下拉选择和现代 datalist 元素。',
    h3_checkbox: '复选框',
    p_checkbox: '复选框允许用户从一组选项中选择零个或多个。每个复选框独立操作。使用 <code>checked</code> 属性设置默认选中。',
    h3_radio: '单选按钮',
    p_radio: '单选按钮让用户从一组中选择恰好一个选项。同一组中的所有单选按钮必须共享相同的 <code>name</code> 属性。',
    h3_select: '下拉选择',
    p_select: '<code>&lt;select&gt;</code> 元素创建下拉菜单。虽然不是 <code>&lt;input&gt;</code>，但它是表单选择的重要元素。使用 <code>multiple</code> 实现多选。',
    h3_datalist: '数据列表（自动补全）',
    p_datalist: '<code>&lt;datalist&gt;</code> 元素为 <code>&lt;input&gt;</code> 提供自动补全建议。用户可以自由输入或从建议中选择。',

    h2_file: '5. 文件与媒体输入',
    p_file: '文件输入允许用户从设备上传文件。<code>hidden</code> 和 <code>image</code> 类型在表单处理中有特殊用途。',
    h3_file_input: '文件上传',
    p_file_input: '<code>file</code> 类型打开文件选择对话框。使用 <code>accept</code> 限制文件类型，使用 <code>multiple</code> 允许多文件选择。',
    h3_image: '图片提交按钮',
    p_image: '<code>image</code> 类型创建图形提交按钮。点击时，表单连同点击位置的 x/y 坐标一起提交。',
    h3_hidden: '隐藏输入',
    p_hidden: '<code>hidden</code> 类型存储随表单提交但对用户不可见的数据。常用于 CSRF 令牌、ID 和跟踪数据。',

    h2_button: '6. 按钮类型',
    p_button: '理解按钮类型之间的区别对于正确的表单行为至关重要。使用错误的类型可能导致意外的表单提交。',
    h3_submit: '提交按钮',
    p_submit: '<code>submit</code> 类型触发表单提交。这是表单内 <code>&lt;button&gt;</code> 元素的默认行为。',
    h3_reset: '重置按钮',
    p_reset: '<code>reset</code> 类型将所有表单控件恢复为初始值。谨慎使用 \u2014 用户很少需要此功能，且可能误点。',
    h3_button: '普通按钮',
    p_button_generic: '<code>button</code> 类型没有默认行为。用于不应提交或重置表单的 JavaScript 驱动操作。',

    h2_validation: '7. 验证属性',
    p_validation: 'HTML5 提供强大的内置验证，减少了对 JavaScript 的依赖。这些属性与<strong>约束验证 API</strong> 配合，提供即时反馈。',
    h3_required: 'required',
    p_required: '<code>required</code> 属性在字段为空时阻止表单提交。它适用于 text、email、password、file、checkbox、radio、select 等。',
    h3_pattern: 'pattern',
    p_pattern: '<code>pattern</code> 属性指定输入值必须匹配的正则表达式。始终提供 <code>title</code> 属性来解释预期格式。',
    h3_minmax_length: 'minlength 与 maxlength',
    p_minmax_length: '这些属性限制用户可以输入的字符数。<code>maxlength</code> 物理上阻止超出限制的输入；<code>minlength</code> 在提交时触发验证。',
    h3_minmax: 'min 与 max',
    p_minmax: '<code>min</code> 和 <code>max</code> 属性为数字和日期输入设置边界。超出此范围的值将验证失败。',

    h2_styling: '8. 样式与用户体验属性',
    p_styling: '这些属性通过提供提示、控制自动填充行为和引导焦点来增强用户体验。',
    h3_placeholder: 'placeholder',
    p_placeholder: '<code>placeholder</code> 属性在输入框内显示提示文本。当用户开始输入时提示消失。<strong>永远不要用 placeholder 替代 label</strong> \u2014 它不具备无障碍性且输入时会消失。',
    h3_autofocus: 'autofocus',
    p_autofocus: '<code>autofocus</code> 属性在页面加载时自动聚焦输入框。每页只应有一个元素具有此属性。谨慎使用，因为它可能会让屏幕阅读器用户感到困惑。',
    h3_autocomplete: 'autocomplete',
    p_autocomplete: '<code>autocomplete</code> 属性提示浏览器期望的数据类型，启用智能自动填充。值包括 <code>name</code>、<code>email</code>、<code>tel</code>、<code>address-line1</code>、<code>cc-number</code> 等。',
    h3_inputmode: 'inputmode',
    p_inputmode: '<code>inputmode</code> 属性控制移动设备上显示的虚拟键盘，而不改变输入类型或验证行为。',

    h2_accessibility: '9. 无障碍最佳实践',
    p_accessibility: '无障碍表单确保所有用户（包括使用屏幕阅读器和辅助技术的用户）都能与你的输入框交互。无障碍性不是可选的 \u2014 在许多司法管辖区它是法律要求。',
    h3_label: '标签',
    p_label: '每个输入框都必须有关联的 <code>&lt;label&gt;</code>。使用 <code>for</code> 属性匹配输入框的 <code>id</code>，或将输入框包裹在 label 元素内。',
    h3_aria: 'ARIA 属性',
    p_aria: 'ARIA 属性为辅助技术提供额外上下文。使用 <code>aria-describedby</code> 提供帮助文本，<code>aria-invalid</code> 标记错误状态，<code>aria-required</code> 作为原生 <code>required</code> 属性的补充。',
    h3_fieldset: 'Fieldset 与 Legend',
    p_fieldset: '使用 <code>&lt;fieldset&gt;</code> 分组相关输入，并用 <code>&lt;legend&gt;</code> 提供组标签。这对单选按钮和复选框组尤其重要。',
    h3_errors: '错误消息',
    p_errors: '在相关输入附近显示错误消息。使用 <code>aria-describedby</code> 将错误与输入关联，使用 <code>aria-live="polite"</code> 向屏幕阅读器朗读错误。',

    h2_mobile: '10. 移动键盘优化',
    p_mobile: '<code>inputmode</code> 属性让你精细控制移动虚拟键盘，而无需更改输入类型。当你需要特定键盘但希望保持 <code>type="text"</code> 进行自定义验证时，这特别有用。',
    h3_numeric: '数字键盘',
    p_numeric: '对于需要数字但不需要 <code>type="number"</code> 行为的字段（如 PIN 码、邮政编码或信用卡号），使用 <code>inputmode="numeric"</code>。',
    h3_email_kb: '电子邮件键盘',
    p_email_kb: '使用 <code>inputmode="email"</code> 显示带有 <code>@</code> 和 <code>.</code> 按键的优化电子邮件键盘。',
    h3_tel_kb: '电话键盘',
    p_tel_kb: '使用 <code>inputmode="tel"</code> 显示完整的电话拨号键盘，适合电话号码输入。',
    h3_url_kb: 'URL 键盘',
    p_url_kb: '使用 <code>inputmode="url"</code> 显示带有 <code>/</code>、<code>.</code> 和 <code>.com</code> 按键的键盘，适合 URL 输入。',
    h3_decimal: '小数键盘',
    p_decimal: '对于可能包含小数点的数字字段（如价格或测量值），使用 <code>inputmode="decimal"</code>。',

    h2_formdata: '11. 表单提交与 FormData API',
    p_formdata: '现代 JavaScript 提供 <strong>FormData API</strong> 用于程序化表单处理。结合 <code>fetch</code> API，你可以在不刷新页面的情况下提交表单。',
    h3_formdata_basic: '基本 FormData 用法',
    p_formdata_basic: '<code>FormData</code> 构造函数接受表单元素并自动收集所有命名输入值。',
    h3_fetch: '使用 Fetch API 提交表单',
    p_fetch: '使用 <code>fetch()</code> 异步提交表单数据。当你传递 <code>FormData</code> 对象时，浏览器会自动设置正确的 <code>Content-Type</code> 头。',
    h3_encoding: '编码类型（enctype）',
    p_encoding: '<code>&lt;form&gt;</code> 上的 <code>enctype</code> 属性控制表单数据在发送前如何编码。三个选项是：',
    encoding_urlencoded: '<code>application/x-www-form-urlencoded</code> \u2014 默认值。键值对用 <code>&amp;</code> 分隔。适合大多数纯文本表单。',
    encoding_multipart: '<code>multipart/form-data</code> \u2014 文件上传必需。每个字段作为带边界标记的独立部分发送。',
    encoding_text: '<code>text/plain</code> \u2014 以纯文本发送数据。很少使用；不建议在生产中使用。',

    h2_comparison: '12. 输入类型对比表',
    p_comparison: '下表总结了所有 HTML 输入类型、其主要用途、移动键盘行为和浏览器支持状态。',
    th_type: '类型',
    th_use_case: '用途',
    th_mobile_kb: '移动键盘',
    th_validation: '内置验证',
    th_support: '浏览器支持',

    h2_faq: '常见问题',
    faq1_q: 'type="button" 和 type="submit" 有什么区别？',
    faq1_a: '<code>type="submit"</code> 在点击时触发表单提交和验证。<code>type="button"</code> 没有默认行为 \u2014 它需要 JavaScript 来执行任何操作。在 <code>&lt;form&gt;</code> 内，没有明确类型的 <code>&lt;button&gt;</code> 默认为 <code>submit</code>，这可能导致意外的表单提交。始终为非提交按钮设置 <code>type="button"</code>。',
    faq2_q: '信用卡字段应该使用 type="number" 还是 inputmode="numeric"？',
    faq2_a: '信用卡号请使用 <code>type="text"</code> 配合 <code>inputmode="numeric"</code>。<code>type="number"</code> 会添加微调箭头、允许科学记数法（如 <code>1e2</code>）并可能去除前导零 \u2014 这些对卡号来说都是不需要的。<code>inputmode</code> 属性可以在没有这些副作用的情况下提供数字键盘。',
    faq3_q: '如何让日期输入必填并设置最小/最大日期？',
    faq3_a: '添加 <code>required</code> 属性以及 <code>YYYY-MM-DD</code> 格式的 <code>min</code> 和 <code>max</code> 属性：<code>&lt;input type="date" required min="2024-01-01" max="2025-12-31"&gt;</code>。如果字段为空或日期超出允许范围，浏览器将阻止提交。',
    faq4_q: 'HTML 中处理文件上传大小限制的最佳方式是什么？',
    faq4_a: '仅靠 HTML 无法强制文件大小限制。<code>accept</code> 属性限制文件类型（如 <code>accept=".pdf,.docx"</code> 或 <code>accept="image/*"</code>），但大小验证必须通过 JavaScript 在 <code>change</code> 事件中使用 <code>input.files[0].size</code> 来完成，或在服务器端完成。无论是否有客户端检查，始终在服务器端验证。',
    faq5_q: '如何自定义原生 HTML 验证错误消息的样式？',
    faq5_a: '你无法直接为原生浏览器验证工具提示设置样式。但是，你可以使用 <code>:invalid</code>、<code>:valid</code>、<code>:required</code> 和 <code>:user-invalid</code> CSS 伪类来为输入框本身设置样式。对于完全自定义的错误消息，使用约束验证 API：调用 <code>input.setCustomValidity("message")</code> 并使用 <code>input.reportValidity()</code>。或者，在表单上使用 <code>novalidate</code> 禁止原生弹窗，然后完全用 JavaScript 实现自定义验证 UI。',

    conclusion: '收藏此页面作为 HTML 输入类型和属性的参考。要构建基于 HTML 的表单和表格，请试用我们下方的工具。',
    link_table: '使用我们的 HTML 表格生成器创建表格 \u2192',
    link_meta: '使用我们的 Meta 标签生成器生成 meta 标签 \u2192',
  },
};

export default function HtmlInputTypesAttributesGuide({ lang }: { lang: string }) {
  const t = translations[lang] || translations['en'];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1_q, acceptedAnswer: { '@type': 'Answer', text: t.faq1_a } },
      { '@type': 'Question', name: t.faq2_q, acceptedAnswer: { '@type': 'Answer', text: t.faq2_a } },
      { '@type': 'Question', name: t.faq3_q, acceptedAnswer: { '@type': 'Answer', text: t.faq3_a } },
      { '@type': 'Question', name: t.faq4_q, acceptedAnswer: { '@type': 'Answer', text: t.faq4_a } },
      { '@type': 'Question', name: t.faq5_q, acceptedAnswer: { '@type': 'Answer', text: t.faq5_a } },
    ],
  };

  const codeStyle: React.CSSProperties = { display: 'inline', background: 'rgba(139,92,246,0.1)', padding: '2px 6px', borderRadius: 4, fontFamily: 'monospace', fontSize: 13 };
  const thStyle: React.CSSProperties = { padding: '8px 12px', textAlign: 'left' };
  const tdStyle: React.CSSProperties = { padding: '8px 12px' };
  const headTr: React.CSSProperties = { borderBottom: '2px solid var(--border-color)' };
  const bodyTr: React.CSSProperties = { borderBottom: '1px solid var(--border-color)' };
  const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', marginBottom: 24 };

  const R = ({ children }: { children: React.ReactNode }) => (
    <tr style={bodyTr}>{children}</tr>
  );
  const C = ({ children }: { children: React.ReactNode }) => (
    <td style={tdStyle}>{children}</td>
  );
  const Cd = ({ children }: { children: React.ReactNode }) => (
    <td style={tdStyle}><code style={codeStyle}>{children}</code></td>
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p dangerouslySetInnerHTML={{ __html: t.intro }} />
      <p>
        <Link href={`/${lang}/tools/html-table`} style={{ fontWeight: 600 }}>
          {t.link_tool}
        </Link>
      </p>

      {/* Section 1: Text Input Types */}
      <h2>{t.h2_text}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_text }} />

      <h3>{t.h3_text_basic}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.p_text_basic }} />
      <pre><code>{`<!-- Basic text input -->
<label for="username">Username:</label>
<input type="text" id="username" name="username"
       placeholder="Enter your username"
       maxlength="30" required>

<!-- With pattern validation -->
<label for="zipcode">ZIP Code:</label>
<input type="text" id="zipcode" name="zipcode"
       pattern="[0-9]{5}" title="5-digit ZIP code"
       placeholder="12345">`}</code></pre>

      <h3>{t.h3_password}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.p_password }} />
      <pre><code>{`<label for="password">Password:</label>
<input type="password" id="password" name="password"
       minlength="8" maxlength="128" required
       autocomplete="new-password"
       aria-describedby="pwd-help">
<small id="pwd-help">Minimum 8 characters</small>`}</code></pre>

      <h3>{t.h3_email}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.p_email }} />
      <pre><code>{`<label for="email">Email:</label>
<input type="email" id="email" name="email"
       placeholder="user@example.com" required
       autocomplete="email">

<!-- Allow multiple emails (comma-separated) -->
<input type="email" id="emails" name="emails" multiple>`}</code></pre>

      <h3>{t.h3_tel}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.p_tel }} />
      <pre><code>{`<label for="phone">Phone:</label>
<input type="tel" id="phone" name="phone"
       pattern="[+]?[0-9]{1,4}[\\s-]?[0-9]{6,14}"
       placeholder="+1 555-123-4567"
       autocomplete="tel">`}</code></pre>

      <h3>{t.h3_url}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.p_url }} />
      <pre><code>{`<label for="website">Website:</label>
<input type="url" id="website" name="website"
       placeholder="https://example.com"
       autocomplete="url">`}</code></pre>

      <h3>{t.h3_search}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.p_search }} />
      <pre><code>{`<label for="search">Search:</label>
<input type="search" id="search" name="q"
       placeholder="Search articles..."
       aria-label="Search articles">`}</code></pre>

      {/* Section 2: Number & Range Inputs */}
      <h2>{t.h2_number}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_number }} />

      <h3>{t.h3_number_input}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.p_number_input }} />
      <pre><code>{`<!-- Basic number input -->
<label for="quantity">Quantity:</label>
<input type="number" id="quantity" name="quantity"
       min="1" max="100" step="1" value="1">

<!-- Decimal number (e.g., price) -->
<label for="price">Price:</label>
<input type="number" id="price" name="price"
       min="0" max="99999.99" step="0.01"
       placeholder="0.00">`}</code></pre>

      <h3>{t.h3_range}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.p_range }} />
      <pre><code>{`<!-- Range slider with output display -->
<label for="volume">Volume:</label>
<input type="range" id="volume" name="volume"
       min="0" max="100" step="5" value="50"
       oninput="this.nextElementSibling.value = this.value">
<output>50</output>

<!-- Range with list of tick marks -->
<input type="range" min="0" max="100" step="25" list="marks">
<datalist id="marks">
  <option value="0" label="0%"></option>
  <option value="25" label="25%"></option>
  <option value="50" label="50%"></option>
  <option value="75" label="75%"></option>
  <option value="100" label="100%"></option>
</datalist>`}</code></pre>

      {/* Section 3: Date & Time Inputs */}
      <h2>{t.h2_date}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_date }} />

      <h3>{t.h3_date_input}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.p_date_input }} />
      <pre><code>{`<label for="birthday">Birthday:</label>
<input type="date" id="birthday" name="birthday"
       min="1900-01-01" max="2025-12-31"
       value="2000-01-15">`}</code></pre>

      <h3>{t.h3_time}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.p_time }} />
      <pre><code>{`<label for="meeting">Meeting Time:</label>
<input type="time" id="meeting" name="meeting"
       min="09:00" max="18:00" step="900"
       value="14:30">
<!-- step="900" = 15-minute increments (900 seconds) -->`}</code></pre>

      <h3>{t.h3_datetime_local}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.p_datetime_local }} />
      <pre><code>{`<label for="appointment">Appointment:</label>
<input type="datetime-local" id="appointment"
       name="appointment"
       min="2025-01-01T08:00"
       max="2025-12-31T18:00">`}</code></pre>

      <h3>{t.h3_month}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.p_month }} />
      <pre><code>{`<label for="card-exp">Card Expiry:</label>
<input type="month" id="card-exp" name="card-exp"
       min="2025-01" max="2035-12">`}</code></pre>

      <h3>{t.h3_week}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.p_week }} />
      <pre><code>{`<label for="week">Select Week:</label>
<input type="week" id="week" name="week"
       min="2025-W01" max="2025-W52">`}</code></pre>

      {/* Section 4: Selection Inputs */}
      <h2>{t.h2_selection}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_selection }} />

      <h3>{t.h3_checkbox}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.p_checkbox }} />
      <pre><code>{`<fieldset>
  <legend>Interests:</legend>

  <label>
    <input type="checkbox" name="interests" value="coding" checked>
    Coding
  </label>

  <label>
    <input type="checkbox" name="interests" value="design">
    Design
  </label>

  <label>
    <input type="checkbox" name="interests" value="devops">
    DevOps
  </label>
</fieldset>

<!-- Single checkbox for boolean (e.g., terms) -->
<label>
  <input type="checkbox" name="terms" required>
  I agree to the Terms of Service
</label>`}</code></pre>

      <h3>{t.h3_radio}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.p_radio }} />
      <pre><code>{`<fieldset>
  <legend>Payment Method:</legend>

  <label>
    <input type="radio" name="payment" value="credit" checked>
    Credit Card
  </label>

  <label>
    <input type="radio" name="payment" value="paypal">
    PayPal
  </label>

  <label>
    <input type="radio" name="payment" value="bank">
    Bank Transfer
  </label>
</fieldset>`}</code></pre>

      <h3>{t.h3_select}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.p_select }} />
      <pre><code>{`<!-- Single select -->
<label for="country">Country:</label>
<select id="country" name="country" required>
  <option value="">-- Select --</option>
  <optgroup label="North America">
    <option value="us">United States</option>
    <option value="ca">Canada</option>
  </optgroup>
  <optgroup label="Europe">
    <option value="uk">United Kingdom</option>
    <option value="de">Germany</option>
  </optgroup>
</select>

<!-- Multi-select -->
<label for="skills">Skills (hold Ctrl to select multiple):</label>
<select id="skills" name="skills" multiple size="5">
  <option value="html">HTML</option>
  <option value="css">CSS</option>
  <option value="js">JavaScript</option>
  <option value="ts">TypeScript</option>
  <option value="react">React</option>
</select>`}</code></pre>

      <h3>{t.h3_datalist}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.p_datalist }} />
      <pre><code>{`<label for="browser">Browser:</label>
<input type="text" id="browser" name="browser"
       list="browsers" placeholder="Start typing...">
<datalist id="browsers">
  <option value="Chrome">
  <option value="Firefox">
  <option value="Safari">
  <option value="Edge">
  <option value="Opera">
</datalist>`}</code></pre>

      {/* Section 5: File & Media Inputs */}
      <h2>{t.h2_file}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_file }} />

      <h3>{t.h3_file_input}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.p_file_input }} />
      <pre><code>{`<!-- Single file upload -->
<label for="avatar">Upload Avatar:</label>
<input type="file" id="avatar" name="avatar"
       accept="image/png, image/jpeg, image/webp">

<!-- Multiple files -->
<label for="documents">Upload Documents:</label>
<input type="file" id="documents" name="documents"
       accept=".pdf,.doc,.docx" multiple>

<!-- Any image -->
<input type="file" accept="image/*" capture="environment">
<!-- capture="environment" opens rear camera on mobile -->
<!-- capture="user" opens front camera -->`}</code></pre>

      <h3>{t.h3_image}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.p_image }} />
      <pre><code>{`<!-- Image as submit button -->
<input type="image" src="/img/submit-btn.png"
       alt="Submit Form" width="100" height="40">
<!-- Submits: x=123&y=45 (click coordinates) -->`}</code></pre>

      <h3>{t.h3_hidden}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.p_hidden }} />
      <pre><code>{`<!-- CSRF token -->
<input type="hidden" name="_csrf" value="abc123token">

<!-- Record ID for update forms -->
<input type="hidden" name="userId" value="42">

<!-- Tracking / analytics -->
<input type="hidden" name="referrer" value="google">`}</code></pre>

      {/* Section 6: Button Types */}
      <h2>{t.h2_button}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_button }} />

      <h3>{t.h3_submit}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.p_submit }} />
      <pre><code>{`<!-- Using <input> -->
<input type="submit" value="Submit Form">

<!-- Using <button> (preferred - allows HTML content) -->
<button type="submit">
  Submit Form
</button>

<!-- Submit to a different URL -->
<button type="submit" formaction="/api/draft" formmethod="post">
  Save as Draft
</button>`}</code></pre>

      <h3>{t.h3_reset}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.p_reset }} />
      <pre><code>{`<input type="reset" value="Reset Form">
<!-- or -->
<button type="reset">Clear All Fields</button>`}</code></pre>

      <h3>{t.h3_button}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.p_button_generic }} />
      <pre><code>{`<!-- IMPORTANT: Always set type="button" for non-submit buttons -->
<button type="button" onclick="togglePreview()">
  Toggle Preview
</button>

<!-- Without type="button", this defaults to submit inside a form! -->
<button type="button" id="add-row">Add Row</button>`}</code></pre>

      {/* Section 7: Validation Attributes */}
      <h2>{t.h2_validation}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_validation }} />

      <h3>{t.h3_required}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.p_required }} />
      <pre><code>{`<input type="text" name="fullname" required>
<input type="email" name="email" required>
<input type="checkbox" name="agree" required>

<!-- Style required fields with CSS -->
<style>
  input:required { border-left: 3px solid #e74c3c; }
  input:valid    { border-left: 3px solid #2ecc71; }
</style>`}</code></pre>

      <h3>{t.h3_pattern}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.p_pattern }} />
      <pre><code>{`<!-- US phone number -->
<input type="tel" name="phone"
       pattern="\\(\\d{3}\\) \\d{3}-\\d{4}"
       title="Format: (123) 456-7890">

<!-- Username: letters, numbers, underscores, 3-16 chars -->
<input type="text" name="username"
       pattern="[a-zA-Z0-9_]{3,16}"
       title="3-16 characters: letters, numbers, underscores">

<!-- Strong password pattern -->
<input type="password" name="password"
       pattern="(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
       title="At least 8 chars with uppercase, lowercase, and number">`}</code></pre>

      <h3>{t.h3_minmax_length}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.p_minmax_length }} />
      <pre><code>{`<!-- Bio: 10 to 500 characters -->
<textarea name="bio" minlength="10" maxlength="500"
          rows="4" required></textarea>

<!-- Tweet-like character limit -->
<input type="text" name="status" maxlength="280"
       placeholder="What's happening?">`}</code></pre>

      <h3>{t.h3_minmax}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.p_minmax }} />
      <pre><code>{`<!-- Age: 18 to 120 -->
<input type="number" name="age" min="18" max="120">

<!-- Date range -->
<input type="date" name="start"
       min="2025-01-01" max="2025-12-31">

<!-- Price: $0.01 to $9999.99 -->
<input type="number" name="price"
       min="0.01" max="9999.99" step="0.01">`}</code></pre>

      {/* Section 8: Styling & UX Attributes */}
      <h2>{t.h2_styling}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_styling }} />

      <h3>{t.h3_placeholder}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.p_placeholder }} />
      <pre><code>{`<!-- Good: Label + placeholder as hint -->
<label for="email">Email Address</label>
<input type="email" id="email" placeholder="user@example.com">

<!-- Bad: Placeholder as only label (not accessible!) -->
<input type="email" placeholder="Email Address">

<!-- Style placeholder text with CSS -->
<style>
  ::placeholder {
    color: #999;
    font-style: italic;
  }
</style>`}</code></pre>

      <h3>{t.h3_autofocus}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.p_autofocus }} />
      <pre><code>{`<!-- Focus the search box on page load -->
<input type="search" name="q" autofocus
       placeholder="Search...">`}</code></pre>

      <h3>{t.h3_autocomplete}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.p_autocomplete }} />
      <pre><code>{`<!-- Full autocomplete for address form -->
<input type="text" name="name" autocomplete="name">
<input type="email" name="email" autocomplete="email">
<input type="tel" name="phone" autocomplete="tel">
<input type="text" name="address" autocomplete="address-line1">
<input type="text" name="city" autocomplete="address-level2">
<input type="text" name="state" autocomplete="address-level1">
<input type="text" name="zip" autocomplete="postal-code">
<input type="text" name="country" autocomplete="country-name">

<!-- Credit card fields -->
<input type="text" name="cc-name" autocomplete="cc-name">
<input type="text" name="cc-number" autocomplete="cc-number"
       inputmode="numeric">
<input type="text" name="cc-exp" autocomplete="cc-exp">
<input type="text" name="cc-csc" autocomplete="cc-csc"
       inputmode="numeric">

<!-- Disable autocomplete for sensitive fields -->
<input type="text" name="otp" autocomplete="off">`}</code></pre>

      <h3>{t.h3_inputmode}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.p_inputmode }} />
      <pre><code>{`<!-- inputmode values and their keyboards -->
<input inputmode="text">       <!-- Default keyboard -->
<input inputmode="numeric">    <!-- 0-9 only -->
<input inputmode="decimal">    <!-- 0-9 + decimal point -->
<input inputmode="tel">        <!-- Telephone keypad -->
<input inputmode="email">      <!-- @ and . visible -->
<input inputmode="url">        <!-- / and .com visible -->
<input inputmode="search">     <!-- Search/Go button -->
<input inputmode="none">       <!-- No keyboard -->`}</code></pre>

      {/* Section 9: Accessibility Best Practices */}
      <h2>{t.h2_accessibility}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_accessibility }} />

      <h3>{t.h3_label}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.p_label }} />
      <pre><code>{`<!-- Method 1: Explicit label with for/id -->
<label for="fname">First Name:</label>
<input type="text" id="fname" name="fname">

<!-- Method 2: Implicit label (wrapping) -->
<label>
  Last Name:
  <input type="text" name="lname">
</label>

<!-- WRONG: No label association -->
<span>Email:</span>
<input type="email" name="email">
<!-- Screen readers cannot identify what this field is for -->`}</code></pre>

      <h3>{t.h3_aria}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.p_aria }} />
      <pre><code>{`<!-- Help text with aria-describedby -->
<label for="pwd">Password:</label>
<input type="password" id="pwd" name="pwd"
       aria-describedby="pwd-requirements" required>
<div id="pwd-requirements">
  Must contain at least 8 characters, one uppercase,
  one lowercase, and one number.
</div>

<!-- Error state with aria-invalid -->
<label for="email">Email:</label>
<input type="email" id="email" name="email"
       aria-invalid="true"
       aria-describedby="email-error">
<div id="email-error" role="alert">
  Please enter a valid email address.
</div>

<!-- aria-required for assistive tech -->
<input type="text" name="company"
       aria-required="true" required>`}</code></pre>

      <h3>{t.h3_fieldset}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.p_fieldset }} />
      <pre><code>{`<fieldset>
  <legend>Shipping Address</legend>

  <label for="street">Street:</label>
  <input type="text" id="street" name="street">

  <label for="city">City:</label>
  <input type="text" id="city" name="city">
</fieldset>

<fieldset>
  <legend>Preferred Contact Method</legend>

  <label>
    <input type="radio" name="contact" value="email"> Email
  </label>
  <label>
    <input type="radio" name="contact" value="phone"> Phone
  </label>
  <label>
    <input type="radio" name="contact" value="sms"> SMS
  </label>
</fieldset>`}</code></pre>

      <h3>{t.h3_errors}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.p_errors }} />
      <pre><code>{`<!-- Accessible error pattern -->
<label for="age">Age:</label>
<input type="number" id="age" name="age"
       min="18" max="120" required
       aria-invalid="true"
       aria-describedby="age-error">
<div id="age-error" role="alert" aria-live="polite"
     style="color: red;">
  Age must be between 18 and 120.
</div>

<!-- JavaScript for custom validation messages -->
<script>
const ageInput = document.getElementById('age');
ageInput.addEventListener('invalid', (e) => {
  if (ageInput.validity.rangeUnderflow) {
    ageInput.setCustomValidity('You must be at least 18.');
  } else if (ageInput.validity.rangeOverflow) {
    ageInput.setCustomValidity('Please enter a realistic age.');
  }
});
ageInput.addEventListener('input', () => {
  ageInput.setCustomValidity('');
});
</script>`}</code></pre>

      {/* Section 10: Mobile Keyboard Optimization */}
      <h2>{t.h2_mobile}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_mobile }} />

      <h3>{t.h3_numeric}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.p_numeric }} />
      <pre><code>{`<!-- PIN code (numeric keyboard, no spinners) -->
<label for="pin">PIN Code:</label>
<input type="text" id="pin" name="pin"
       inputmode="numeric" pattern="[0-9]{4,6}"
       maxlength="6" autocomplete="one-time-code">

<!-- ZIP code -->
<input type="text" name="zip"
       inputmode="numeric" pattern="[0-9]{5}"
       autocomplete="postal-code">`}</code></pre>

      <h3>{t.h3_email_kb}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.p_email_kb }} />
      <pre><code>{`<input type="email" inputmode="email"
       autocomplete="email">`}</code></pre>

      <h3>{t.h3_tel_kb}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.p_tel_kb }} />
      <pre><code>{`<input type="tel" inputmode="tel"
       autocomplete="tel">`}</code></pre>

      <h3>{t.h3_url_kb}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.p_url_kb }} />
      <pre><code>{`<input type="url" inputmode="url"
       autocomplete="url">`}</code></pre>

      <h3>{t.h3_decimal}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.p_decimal }} />
      <pre><code>{`<!-- Price field with decimal keyboard -->
<label for="amount">Amount ($):</label>
<input type="text" id="amount" name="amount"
       inputmode="decimal" pattern="[0-9]*\\.?[0-9]+"
       placeholder="0.00">`}</code></pre>

      {/* Section 11: Form Submission & FormData API */}
      <h2>{t.h2_formdata}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_formdata }} />

      <h3>{t.h3_formdata_basic}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.p_formdata_basic }} />
      <pre><code>{`const form = document.querySelector('#myForm');
const formData = new FormData(form);

// Access individual values
const email = formData.get('email');       // string | null
const files = formData.getAll('photos');   // File[]

// Iterate over all entries
for (const [key, value] of formData.entries()) {
  console.log(key, value);
}

// Append extra data
formData.append('timestamp', Date.now().toString());

// Convert to plain object
const data = Object.fromEntries(formData.entries());

// Convert to URL-encoded string
const params = new URLSearchParams(formData).toString();
// "name=John&email=john%40example.com"`}</code></pre>

      <h3>{t.h3_fetch}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.p_fetch }} />
      <pre><code>{`// Submit as multipart/form-data (for file uploads)
const form = document.querySelector('#uploadForm');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
    // Do NOT set Content-Type header manually!
    // The browser sets it with the correct boundary
  });

  const result = await response.json();
  console.log(result);
});

// Submit as JSON
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  const response = await fetch('/api/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
});`}</code></pre>

      <h3>{t.h3_encoding}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.p_encoding }} />
      <ul>
        <li dangerouslySetInnerHTML={{ __html: t.encoding_urlencoded }} />
        <li dangerouslySetInnerHTML={{ __html: t.encoding_multipart }} />
        <li dangerouslySetInnerHTML={{ __html: t.encoding_text }} />
      </ul>
      <pre><code>{`<!-- Default: URL-encoded -->
<form method="post" action="/api/contact">
  ...
</form>

<!-- File upload: Must use multipart -->
<form method="post" action="/api/upload"
      enctype="multipart/form-data">
  <input type="file" name="document">
  <button type="submit">Upload</button>
</form>`}</code></pre>

      {/* Section 12: Input Types Comparison Table */}
      <h2>{t.h2_comparison}</h2>
      <p>{t.p_comparison}</p>
      <div style={{ overflowX: 'auto' }}>
        <table style={tableStyle}>
          <thead>
            <tr style={headTr}>
              <th style={thStyle}>{t.th_type}</th>
              <th style={thStyle}>{t.th_use_case}</th>
              <th style={thStyle}>{t.th_mobile_kb}</th>
              <th style={thStyle}>{t.th_validation}</th>
              <th style={thStyle}>{t.th_support}</th>
            </tr>
          </thead>
          <tbody>
            <R><Cd>text</Cd><C>General text</C><C>Standard</C><C>pattern, minlength, maxlength</C><C>All</C></R>
            <R><Cd>password</Cd><C>Passwords</C><C>Standard (masked)</C><C>pattern, minlength, maxlength</C><C>All</C></R>
            <R><Cd>email</Cd><C>Email addresses</C><C>@ key visible</C><C>Email format</C><C>All</C></R>
            <R><Cd>tel</Cd><C>Phone numbers</C><C>Phone keypad</C><C>None (use pattern)</C><C>All</C></R>
            <R><Cd>url</Cd><C>Web addresses</C><C>/ and .com keys</C><C>URL format</C><C>All</C></R>
            <R><Cd>search</Cd><C>Search queries</C><C>Search button</C><C>None</C><C>All</C></R>
            <R><Cd>number</Cd><C>Numeric values</C><C>Number pad</C><C>min, max, step</C><C>All</C></R>
            <R><Cd>range</Cd><C>Value in range</C><C>N/A (slider)</C><C>min, max, step</C><C>All</C></R>
            <R><Cd>date</Cd><C>Calendar date</C><C>Date picker</C><C>min, max</C><C>All modern</C></R>
            <R><Cd>time</Cd><C>Time of day</C><C>Time picker</C><C>min, max, step</C><C>All modern</C></R>
            <R><Cd>datetime-local</Cd><C>Date + time</C><C>Date-time picker</C><C>min, max</C><C>All modern</C></R>
            <R><Cd>month</Cd><C>Year + month</C><C>Month picker</C><C>min, max</C><C>Partial (no Firefox)</C></R>
            <R><Cd>week</Cd><C>Year + week</C><C>Week picker</C><C>min, max</C><C>Partial (no Firefox)</C></R>
            <R><Cd>checkbox</Cd><C>Multiple selection</C><C>N/A</C><C>required</C><C>All</C></R>
            <R><Cd>radio</Cd><C>Single selection</C><C>N/A</C><C>required</C><C>All</C></R>
            <R><Cd>file</Cd><C>File upload</C><C>File picker</C><C>accept, required</C><C>All</C></R>
            <R><Cd>hidden</Cd><C>Hidden data</C><C>N/A</C><C>None</C><C>All</C></R>
            <R><Cd>image</Cd><C>Image submit</C><C>N/A</C><C>None</C><C>All</C></R>
            <R><Cd>color</Cd><C>Color picker</C><C>Color palette</C><C>None</C><C>All modern</C></R>
            <R><Cd>submit</Cd><C>Form submit</C><C>N/A</C><C>Triggers validation</C><C>All</C></R>
            <R><Cd>reset</Cd><C>Form reset</C><C>N/A</C><C>None</C><C>All</C></R>
            <R><Cd>button</Cd><C>Custom action</C><C>N/A</C><C>None</C><C>All</C></R>
          </tbody>
        </table>
      </div>

      {/* Section 13: FAQ */}
      <h2>{t.h2_faq}</h2>
      <h3>{t.faq1_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.faq1_a }} />
      <h3>{t.faq2_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.faq2_a }} />
      <h3>{t.faq3_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.faq3_a }} />
      <h3>{t.faq4_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.faq4_a }} />
      <h3>{t.faq5_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.faq5_a }} />

      <p style={{ marginTop: 32 }}>{t.conclusion}</p>
      <p>
        <Link href={`/${lang}/tools/html-table`} style={{ fontWeight: 600 }}>
          {t.link_table}
        </Link>
      </p>
      <p>
        <Link href={`/${lang}/tools/meta-tag-generator`} style={{ fontWeight: 600 }}>
          {t.link_meta}
        </Link>
      </p>
    </>
  );
}
