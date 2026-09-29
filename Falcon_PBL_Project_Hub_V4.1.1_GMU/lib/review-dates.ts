const DATE_ONLY=/^\d{4}-\d{2}-\d{2}$/;

export function submissionDateBounds(startDate:string,lastDate:string){
  const start=startDate.trim();
  const last=lastDate.trim();
  if(!DATE_ONLY.test(start)||!DATE_ONLY.test(last)) throw new Error('Submission Start Date and Submission Last Date are required.');
  if(start>last) throw new Error('Submission Last Date cannot be before Submission Start Date.');
  return {
    startDate:start,
    lastDate:last,
    openAt:`${start}T00:00:00+05:30`,
    deadline:`${last}T23:59:59.999+05:30`,
  };
}

export function dateOnlyLabel(value:unknown){
  if(!value)return '—';
  const d=new Date(String(value));
  if(Number.isNaN(d.getTime()))return String(value).slice(0,10);
  return new Intl.DateTimeFormat('en-IN',{day:'2-digit',month:'2-digit',year:'numeric',timeZone:'Asia/Kolkata'}).format(d);
}
