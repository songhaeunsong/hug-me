import { Link } from 'react-router-dom';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import { type Precaution } from './precautionConstants';

interface PrecautionProps {
  precautions: Precaution[];
}
export const ContractPrecaution = ({ precautions }: PrecautionProps) => {
  return (
    <Accordion type="single" collapsible className="w-full flex flex-col gap-4">
      {precautions.map((precaution, precautionIdx) => {
        return (
          <>
            <span className="font-semibold text-start">{precaution.title}</span>
            {precaution.items.map((item, itemIdx) => {
              return (
                <AccordionItem
                  className="bg-white rounded-xl px-4"
                  value={`item-${precautionIdx}-${itemIdx}`}
                  key={`item-${precautionIdx}-${itemIdx}`}
                >
                  <AccordionTrigger className="items-center">{item.trigger}</AccordionTrigger>
                  <AccordionContent className="flex flex-col items-start gap-4 text-[14px]">
                    <div className=" w-full border-t-1 border-divider-gray" />
                    {item.checkPoints && (
                      <div className="flex flex-col gap-1 w-full">
                        {item.checkPoints.map((checkPoint, checkPointIdx) => (
                          <span className="text-start" key={`cp-${precautionIdx}-${itemIdx}-${checkPointIdx}`}>
                            {checkPoint}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-col items-start gap-4 w-full">
                      {item.contents.map((content, contentIdx) => {
                        if (content.type === 'link') {
                          return (
                            <>
                              {content.title && <span className="font-semibold">{content.title}</span>}
                              {content.lists?.map((list, listIdx) => (
                                <Link
                                  className="bg-bgcolor rounded-xl p-4 w-full text-start font-semibold"
                                  to={list.url}
                                  key={`link-${precautionIdx}-${itemIdx}-${contentIdx}-${listIdx}`}
                                >
                                  <div className="flex flex-col gap-[1px]">
                                    {list.description && (
                                      <span className="text-gray-2 font-semibold text-[12px]">{list.description}</span>
                                    )}
                                    <span className="font-semibold">{list.title}</span>
                                  </div>
                                </Link>
                              ))}
                            </>
                          );
                        }
                        if (content.type === 'text') {
                          return (
                            <div
                              className="flex flex-col gap-1"
                              key={`content-${precautionIdx}-${itemIdx}-${contentIdx}`}
                            >
                              {content.lists?.map((list, listIdx) => (
                                <span
                                  className="text-start"
                                  key={`text-${precautionIdx}-${itemIdx}-${contentIdx}-${listIdx}`}
                                >
                                  {list}
                                </span>
                              ))}
                            </div>
                          );
                        }
                        if (content.type === 'deposit-check') {
                          return (
                            <>
                              <div className="flex flex-col items-start gap-1">
                                <span className="font-semibold">{content.title}</span>
                                <span className="text-gray-2 text-[12px]">{content.description}</span>
                              </div>

                              <Link
                                className="bg-bgcolor rounded-xl p-4 w-full text-start font-semibold"
                                to="/deposit-check"
                                key={`content-${precautionIdx}-${itemIdx}-${contentIdx}`}
                              >
                                매매가 별 적정 보증금 확인하기
                              </Link>
                            </>
                          );
                        }

                        if (content.type === 'example') {
                          return (
                            <div
                              className="flex flex-col p-4 w-full bg-bgcolor rounded-xl gap-1"
                              key={`content-${precautionIdx}-${itemIdx}-${contentIdx}`}
                            >
                              {content.lists.map((list, listIdx) => {
                                return (
                                  <span
                                    className="text-start"
                                    key={`example-${precautionIdx}-${itemIdx}-${contentIdx}-${listIdx}`}
                                  >
                                    {list}
                                  </span>
                                );
                              })}
                            </div>
                          );
                        }
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </>
        );
      })}
    </Accordion>
  );
};
